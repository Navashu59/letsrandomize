import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const env = await fs.readFile("/Users/bluepha/.env", "utf8");
const apiKey = env.split(/\r?\n/).find((line) => line.startsWith("DEEPSEEK_API_KEY="))?.split("=").slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
if (!apiKey) throw new Error("DEEPSEEK_API_KEY is not configured");

const pages = [
  "random-question-generator", "random-card-picker", "random-noun-generator", "random-adjective-generator",
  "random-decision-maker", "truth-or-dare-generator", "would-you-rather-generator", "never-have-i-ever-generator"
];
const pageEvidence = {};
for (const slug of pages) {
  const html = await fs.readFile(path.join(root, "public/tools", slug, "index.html"), "utf8");
  pageEvidence[slug] = {
    title: html.match(/<title>(.*?)<\/title>/)?.[1],
    h1: html.match(/<h1>(.*?)<\/h1>/)?.[1],
    sections: [...html.matchAll(/<h2>(.*?)<\/h2>/g)].map((match) => match[1]),
    featureSentences: [...html.matchAll(/<p>(.*?)<\/p>/g)].map((match) => match[1].replace(/<[^>]+>/g, " ")).filter((text) => /choose|select|draw|category|repeat|replacement|built-in|prompt/i.test(text)).slice(0, 5)
  };
}

const logic = await fs.readFile(path.join(root, "public/assets/js/prompt-generators.js"), "utf8");
const promptReview = JSON.parse(await fs.readFile("/tmp/deepseek-prompt-safety-review.json", "utf8").catch(() => "null"));
const prompt = `Act as an independent release reviewer for a general-audience random-generator site. Review the implementation evidence below. The highest-traffic List Randomizer, Team Generator, Number Generator and Name Generator were intentionally not changed. Yes/No only had one duplicated content section removed. Author must remain Sam Parker.\n\nCheck: (1) feature claims match logic, (2) prompt and interaction safety, (3) SEO titles are natural rather than stuffed, (4) content changes are appropriately limited, (5) bugs or edge cases, (6) whether release should be blocked. Do not invent missing evidence. Return JSON only with verdict PASS or BLOCK, blocking_findings, non_blocking_findings, seo_assessment, safety_assessment, protected_pages_assessment, required_changes.\n\nPage evidence:\n${JSON.stringify(pageEvidence)}\n\nInteraction logic:\n${logic}\n\nEarlier prompt review if available:\n${JSON.stringify(promptReview)}`;

const response = await fetch("https://api.deepseek.com/chat/completions", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
  body: JSON.stringify({ model: "deepseek-chat", temperature: 0.1, max_tokens: 5000, messages: [{ role: "system", content: "Return valid JSON only." }, { role: "user", content: prompt }] })
});
if (!response.ok) throw new Error(`DeepSeek request failed: ${response.status} ${await response.text()}`);
const payload = await response.json();
const content = payload.choices?.[0]?.message?.content || "{}";
const review = JSON.parse(content.replace(/^```json\s*|\s*```$/g, ""));
const output = { generated_at: new Date().toISOString(), model: payload.model, reviewed_files: ["public/assets/js/prompt-generators.js", ...pages.map((slug) => `public/tools/${slug}/index.html`)], review };
await fs.writeFile(path.join(root, "docs/deepseek-generator-expansion-review-2026-08-02.json"), JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify({ model: output.model, verdict: review.verdict, blocking: review.blocking_findings?.length || 0, required: review.required_changes?.length || 0 }, null, 2));
