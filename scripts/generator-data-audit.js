#!/usr/bin/env node
"use strict";

const fs = require("fs");
const vm = require("vm");

const file = process.argv[2] || "public/assets/js/generator-data.js";
const source = fs.readFileSync(file, "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { filename: file });
const data = sandbox.window.GeneratorData;
const failures = [];

function flatten(value) {
  if (Array.isArray(value)) return value.flatMap(flatten);
  if (value && typeof value === "object") return Object.values(value).flatMap(flatten);
  return typeof value === "string" ? [value] : [];
}

const requirements = {
  questions: 120,
  wouldYouRather: 100,
  neverHaveIEver: 80,
  truthOrDare: 100,
  nouns: 800,
  adjectives: 500
};

for (const [key, minimum] of Object.entries(requirements)) {
  const values = flatten(data && data[key]);
  const normalized = values.map((value) => value.trim().toLowerCase());
  if (values.length < minimum) failures.push(`${key}: ${values.length} entries, expected at least ${minimum}`);
  if (new Set(normalized).size !== normalized.length) failures.push(`${key}: duplicate entries found`);
  if (values.some((value) => /\b(?:sex|porn|alcohol|drugs?|suicide|weapon|naked)\b/i.test(value))) {
    failures.push(`${key}: blocked general-audience term found`);
  }
  if (values.some((value) => /\((?:but not|if possible|otherwise)/i.test(value))) {
    failures.push(`${key}: editorial note leaked into user-facing data`);
  }
}

for (const key of ["nouns", "adjectives"]) {
  if (flatten(data[key]).some((value) => !/^[a-z]{3,14}$/.test(value))) failures.push(`${key}: invalid word format`);
}

if (failures.length) {
  console.error(`Generator data audit failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Generator data audit passed:", Object.fromEntries(Object.keys(requirements).map((key) => [key, flatten(data[key]).length])));
