#!/usr/bin/env python3
"""Apply the reviewed 2026-07-24 content-quality remediation."""

from __future__ import annotations

import json
import re
from pathlib import Path

from bs4 import BeautifulSoup


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
UPDATED = "2026-07-24"
PRIVACY_TEXT = (
    "User-entered values and generated results are processed in your browser. "
    "Hosting, analytics, advertising, and security providers may still receive "
    "technical request data; see the privacy policy."
)

TOOLS = {
    "random-question-generator": {
        "title": "Random Question Generator - Conversation & Writing Prompts",
        "description": "Pick one random conversation or writing prompt. Copy, share, or review recent questions stored in this browser.",
        "h1": "Random Question Generator",
        "intro": "Need a prompt for a conversation, journal entry, or group warm-up? Select one question from the built-in list with each click.",
        "sections": [
            ("How do I generate a random question?", [
                "Click Generate to pick one general-audience prompt from the built-in list. Generate again if the first question does not fit the moment.",
                "You can copy the result, share it, or review recent results saved in this browser. The tool does not create questions with AI and it does not accept custom question lists.",
            ]),
            ("What can I use a random question for?", [
                "Use a question as an icebreaker, a short writing prompt, a meeting warm-up, or a starting point for a one-to-one conversation. The list mixes opinions, everyday experiences, and hypothetical choices, so no specialist knowledge is required.",
            ]),
            ("What should I check before asking a group?", [
                "Read the question before asking it aloud. Skip anything that feels too personal for the group, and allow people to pass. For lessons or facilitated sessions, choose the prompt yourself when safeguarding, accommodations, or learning goals require more control.",
            ]),
        ],
        "faq": [
            ("Can I add my own questions?", "No. This version selects from a fixed built-in list."),
            ("Does the tool use AI to write questions?", "No. Each result is selected from a maintained list in the page code."),
            ("Are recent questions uploaded?", "Recent results are stored in this browser. Technical request data may still be handled by the site's hosting, analytics, advertising, and security providers."),
        ],
    },
    "random-noun-generator": {
        "title": "Random Noun Generator - Pick an English Noun",
        "description": "Generate one random English noun for writing prompts, vocabulary practice, games, or brainstorming.",
        "h1": "Random Noun Generator",
        "intro": "Generate one English noun at a time from the site's built-in word list.",
        "sections": [
            ("How do I pick a random noun?", ["Click Generate to select one noun. Generate again for another word, or copy the current result."]),
            ("What can I do with a random noun?", ["Use the word as a writing constraint, a drawing prompt, a vocabulary cue, or a neutral label in a quick game."]),
            ("What words are included?", ["The list contains common English nouns. It is a practical prompt list, not a dictionary, frequency index, or age-graded vocabulary set."]),
        ],
        "faq": [
            ("Can I generate more than one noun at once?", "This page returns one noun per click."),
            ("Can I upload a word list?", "No. Use the List Randomizer when you need to shuffle your own words."),
            ("Are all English nouns included?", "No. Results come from a limited built-in list of common nouns."),
        ],
    },
    "random-adjective-generator": {
        "title": "Random Adjective Generator - Pick an English Adjective",
        "description": "Generate one random English adjective for writing, vocabulary practice, naming exercises, or games.",
        "h1": "Random Adjective Generator",
        "intro": "Pick one adjective from a built-in list of common English describing words.",
        "sections": [
            ("How do I generate a random adjective?", ["Click Generate for one adjective, then copy the result or generate another."]),
            ("How can a random adjective help with writing?", ["Pair the result with a noun to create an unexpected phrase, character trait, setting detail, or short writing constraint."]),
            ("What does this tool not check?", ["The tool does not check grammar, tone, reading level, or whether the adjective fits your sentence. Review the result in context."]),
        ],
        "faq": [
            ("Does it include comparative adjectives?", "The current list mainly contains base-form adjectives."),
            ("Can I add my own adjectives?", "No. To randomize your own vocabulary list, use the List Randomizer."),
            ("Can the same word appear again?", "Yes. Each click makes an independent selection, so repeats are possible."),
        ],
    },
    "random-card-picker": {
        "title": "Random Card Picker - Draw from a 52-Card Deck",
        "description": "Draw one random playing card from a standard 52-card deck. Each click is an independent draw.",
        "h1": "Random Card Picker",
        "intro": "Draw one rank and suit from a standard 52-card deck.",
        "sections": [
            ("How do I draw a random playing card?", ["Click Generate to draw one card. The result includes its rank and suit."]),
            ("Does the card return to the deck?", ["Yes. Each click is an independent draw from all 52 cards, so the same card can appear twice. This is sampling with replacement, not a dealt hand."]),
            ("When should I use a deck shuffler instead?", ["Use a full deck shuffler when order matters, when cards must not repeat, or when you need to deal several cards from one deck."]),
        ],
        "faq": [
            ("Does this deck include jokers?", "No. It uses the 52 standard cards from ace through king in four suits."),
            ("Can the same card be drawn twice?", "Yes. The deck resets for every click."),
            ("Can I draw several cards without replacement?", "Not on this page. It returns one independent card per click."),
        ],
    },
    "random-decision-maker": {
        "title": "Random Decision Maker - Choose Between Your Options",
        "description": "Enter two or more options and let the random decision maker choose one. Duplicate lines receive extra weight.",
        "h1": "Random Decision Maker",
        "intro": "Enter at least two options, one per line, then make a neutral random pick.",
        "sections": [
            ("How do I make a random choice?", ["Replace the example lines with your options and click Choose an Option. Blank lines are ignored."]),
            ("Do duplicate options change the odds?", ["Yes. Every non-empty line is one entry. Repeating an option gives it more entries and therefore more chance of being selected."]),
            ("When should I not decide randomly?", ["Do not delegate safety, medical, legal, financial, consent, or other high-impact decisions to a random picker. Use it for low-stakes choices when the available options are already acceptable."]),
        ],
        "faq": [
            ("How many options do I need?", "Enter at least two non-empty lines."),
            ("Can I weight an option?", "Repeat the same option on additional lines to give it more weight."),
            ("Are my options processed on a server?", "The selection runs in your browser. Technical request data may still be handled by the site's service providers."),
        ],
    },
    "would-you-rather-generator": {
        "title": "Would You Rather Generator - Random Questions",
        "description": "Pick a light, general-audience Would You Rather question for conversations, classes, or group games.",
        "h1": "Would You Rather Generator",
        "intro": "Generate one either-or question for a conversation or low-pressure group activity.",
        "sections": [
            ("How do I get a Would You Rather question?", ["Click Generate for one built-in question. Ask both sides to explain their choice if the group wants a longer discussion."]),
            ("Who are these questions for?", ["The prompts are written for a broad audience and avoid adult-only categories. Still, read each prompt before using it with children, students, or a work group."]),
            ("Can people skip a question?", ["Yes. A pass or re-roll rule keeps a voluntary social game comfortable for everyone."]),
        ],
        "faq": [
            ("Can I choose a category?", "No. This version uses one mixed general-audience list."),
            ("Can I add my own questions?", "No. Custom question lists are not supported."),
            ("Will questions repeat?", "They can. Each click is an independent random pick."),
        ],
    },
    "truth-or-dare-generator": {
        "title": "Truth or Dare Generator - Safe, Simple Prompts",
        "description": "Generate a light truth question or simple dare for a voluntary, general-audience group game.",
        "h1": "Truth or Dare Generator",
        "intro": "Pick one light truth question or low-risk dare from a built-in list.",
        "sections": [
            ("How does the Truth or Dare generator work?", ["Click Generate to receive either a truth or a dare. The prompt label tells you which type was selected."]),
            ("How do we keep the game comfortable?", ["Agree that anyone may pass, re-roll, or stop. Do not use a dare that risks injury, humiliation, property damage, or disclosure of private information."]),
            ("Is this an adult Truth or Dare generator?", ["No. The list is designed for a general audience and does not offer an adult category. Hosts should still review prompts for their particular group."]),
        ],
        "faq": [
            ("Can I choose only truths or only dares?", "No. The current tool selects from one mixed list."),
            ("Can players skip a prompt?", "Yes. Passing should always be allowed."),
            ("Are the dares checked for every situation?", "No. Use your judgment and skip any prompt that is unsafe or inappropriate in your setting."),
        ],
    },
    "never-have-i-ever-generator": {
        "title": "Never Have I Ever Generator - General Questions",
        "description": "Generate a light, general-audience Never Have I Ever statement for conversations and voluntary group games.",
        "h1": "Never Have I Ever Generator",
        "intro": "Pick one light Never Have I Ever statement from a built-in list.",
        "sections": [
            ("How do I play Never Have I Ever?", ["Choose a response method before starting, such as raising a hand or keeping a point. Click Generate and let participants respond only if they want to."]),
            ("Are these statements suitable for every group?", ["They are written for a general audience, but no list fits every age, culture, workplace, or classroom. Read the statement first and re-roll when needed."]),
            ("How do we avoid putting people on the spot?", ["Allow passes, avoid demanding explanations, and do not use responses to pressure someone into sharing personal details."]),
        ],
        "faq": [
            ("Can I choose an adult category?", "No. This page uses one general-audience list."),
            ("Can the same statement appear twice?", "Yes. Every click is an independent selection."),
            ("Can I submit my own statements?", "No. Custom prompts are not supported."),
        ],
    },
}

TEACHERS = {
    "title": "Random Generators for Teachers: Classroom Uses and Limits",
    "description": "Practical ways teachers can randomize presentation order, quick groups, and prompts, plus situations where random selection is inappropriate.",
    "h1": "How Can Teachers Use Random Generators in Class?",
    "intro": "Random generators can speed up routine classroom choices, but they do not replace teacher judgment. Use them when every available outcome is acceptable.",
    "sections": [
        ("How can I randomize participation or presentation order?", [
            "Paste student names into the List Randomizer and shuffle once to create an order for presentations, sharing, or reading. Keeping the full order visible is usually clearer than repeatedly picking one name.",
            "For spoken responses, give thinking time and allow a pass when appropriate. Random calling does not by itself make participation equitable or reduce anxiety.",
        ]),
        ("How do I make quick random groups?", [
            "Use the Random Team Generator for short, low-stakes activities such as station rotations or think-pair-share. Enter the roster, choose the number or size of teams, and review the result before announcing it.",
            "When skill balance, accessibility, behavior plans, or known conflicts matter, assign groups deliberately. The balanced-team guide explains a more controlled process.",
        ]),
        ("What random prompts work for classroom warm-ups?", [
            "A random question can start a journal entry, pair discussion, or closing reflection. Read the prompt before showing it and replace it when it does not fit the subject, age group, or lesson objective.",
        ]),
        ("When should a teacher avoid random selection?", [
            "Do not use randomness to assign grades, determine accommodations, override safety or behavior plans, or make high-stakes placement decisions. It is also a poor fit when students need intentionally balanced support.",
            "The useful rule is simple: randomize the order or grouping only after deciding that every possible result is acceptable.",
        ]),
    ],
    "faq": [
        ("Can I randomly call on students?", "You can, but provide thinking time and an appropriate pass option. Random calling is not a substitute for an inclusive participation plan."),
        ("How do I create balanced student teams?", "Use explicit criteria and teacher review rather than pure randomness. See the balanced-team guide linked on this page."),
        ("Do these classroom tools require student accounts?", "No. The linked LetsRandomize tools can be used without creating an account."),
    ],
}

NAME_GUIDE = {
    "title": "How to Use a Random Name Generator",
    "description": "Choose name type, built-in name set, optional gender, and quantity. Learn when to generate names and when to shuffle an existing list.",
    "h1": "How to Use a Random Name Generator",
    "intro": "The Random Name Generator combines entries from built-in name lists. Treat the results as prompts or placeholders, not verified identities.",
    "sections": [
        ("How do I generate first, last, or full names?", [
            "Open the Random Name Generator and choose first name, last name, or full name. Select the US/UK, Japanese, or Spanish built-in set, optionally choose a gender setting, and request between 1 and 20 results.",
            "After generating, you can copy or share the result. Recent results may remain in local browser history.",
        ]),
        ("What do the country and language labels mean?", [
            "The labels identify small built-in lists used by this tool. They are not complete records of naming practices, current popularity, regional variation, or cultural identity.",
            "Review a name with reliable cultural and linguistic sources before using it in published work or for a real person.",
        ]),
        ("Should I generate names or shuffle my own list?", [
            "Generate when you need a new fictional prompt or placeholder. Use the List Randomizer when you already have a roster, attendee list, or set of candidate names and only need to change their order.",
        ]),
        ("What are appropriate uses for generated names?", [
            "Generated names can help with character sketches, sample form data, mockups, and brainstorming. Do not use them to impersonate real people, infer identity, or make decisions about someone based on a perceived background.",
        ]),
    ],
    "faq": [
        ("Are generated names linked to real people?", "No. The tool randomly combines entries from built-in lists and does not look up identity records."),
        ("Are the cultural name sets complete?", "No. They are limited prompt lists and cannot represent all regional or cultural naming practices."),
        ("Can I save a list of generated names?", "You can copy the output. Recent results may also remain in this browser's local history."),
    ],
}

TYPES_GUIDE = {
    "title": "Types of Randomness: Physical, Pseudorandom, and Statistical",
    "description": "Learn how physical randomness, pseudorandom generators, cryptographic randomness, and statistical randomness differ and where each is used.",
    "h1": "What Are the Main Types of Randomness?",
    "intro": "Randomness can describe an unpredictable physical event, an algorithmic sequence, or variation in observed data. The right meaning depends on the problem.",
    "sections": [
        ("What is physical or true randomness?", [
            "Physical random sources measure processes such as electronic noise or quantum events. The measurement equipment, sampling method, and bias correction still matter; calling a source physical does not automatically prove that its output is uniform or independent.",
        ]),
        ("What is pseudorandomness?", [
            "A pseudorandom number generator starts from an internal state, often called a seed, and produces a deterministic sequence that has useful statistical properties. The same algorithm and seed reproduce the same sequence, which is valuable in testing and simulation.",
            "Ordinary pseudorandom generators can be suitable for games and repeatable experiments, but predictable state makes many of them unsuitable for passwords, tokens, or encryption keys.",
        ]),
        ("What makes a random generator cryptographically secure?", [
            "A cryptographically secure pseudorandom number generator is designed so that observed output does not feasibly reveal past or future output. Browsers expose this class of randomness through the Web Crypto API.",
            "LetsRandomize uses browser cryptographic randomness when available for its shared randomization engine, with a Math.random fallback for older browsers. That fallback is for casual use, not security-sensitive decisions.",
        ]),
        ("What does random mean in statistics?", [
            "In statistics, random often describes a sampling or assignment process with defined probabilities. A random sample is not simply a varied-looking group: every eligible unit needs a known selection mechanism.",
            "Statistical tests can find certain patterns or bias, but no finite test proves that an unknown sequence is truly random. Evaluation combines the source, implementation, threat model, and observed behavior.",
        ]),
    ],
    "faq": [
        ("Is Math.random truly random?", "No. It is an implementation-dependent pseudorandom generator and is not intended for cryptographic use."),
        ("Is browser crypto randomness physical randomness?", "Not directly. The browser exposes a cryptographically secure pseudorandom interface whose implementation is seeded by the operating system."),
        ("Can a random-looking sequence still be predictable?", "Yes. Visual irregularity does not show whether an algorithm or hidden state can predict the sequence."),
    ],
}


def set_meta(soup: BeautifulSoup, name: str, value: str) -> None:
    tag = soup.find("meta", attrs={"name": name})
    if tag:
        tag["content"] = value


def set_property(soup: BeautifulSoup, prop: str, value: str) -> None:
    tag = soup.find("meta", attrs={"property": prop})
    if tag:
        tag["content"] = value


def update_jsonld(soup: BeautifulSoup, title: str | None = None, description: str | None = None,
                  faq: list[tuple[str, str]] | None = None) -> None:
    for tag in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            data = json.loads(tag.string or "")
        except (TypeError, json.JSONDecodeError):
            continue
        nodes = data if isinstance(data, list) else [data]
        changed = False
        for node in nodes:
            if not isinstance(node, dict):
                continue
            node_type = node.get("@type")
            if title and node_type == "SoftwareApplication":
                node["name"] = title
                if description:
                    node["description"] = description
                changed = True
            if title and node_type == "Article":
                node["headline"] = title
                node["dateModified"] = UPDATED
                changed = True
            if node_type == "Article" and isinstance(node.get("author"), dict):
                node["author"] = {
                    "@type": "Organization",
                    "name": "LetsRandomize Editorial Team",
                    "url": "https://letsrandomize.org/about/",
                }
                changed = True
            if faq is not None and node_type == "FAQPage":
                node["mainEntity"] = [
                    {
                        "@type": "Question",
                        "name": question,
                        "acceptedAnswer": {"@type": "Answer", "text": answer},
                    }
                    for question, answer in faq
                ]
                changed = True
            if node_type == "BreadcrumbList" and title:
                items = node.get("itemListElement", [])
                if items:
                    items[-1]["name"] = title
                    changed = True
        if changed:
            tag.string = json.dumps(data, indent=2, ensure_ascii=True)


def make_section(soup: BeautifulSoup, heading: str, paragraphs: list[str]):
    section = soup.new_tag("section", attrs={"class": "content-section"})
    h2 = soup.new_tag("h2")
    h2.string = heading
    section.append(h2)
    for text in paragraphs:
        p = soup.new_tag("p")
        p.string = text
        section.append(p)
    return section


def replace_content_sections(soup: BeautifulSoup, sections: list[tuple[str, list[str]]]) -> None:
    container = soup.select_one("main .container")
    if not container:
        return
    old_sections = [
        node for node in container.find_all("section", class_="content-section", recursive=False)
    ]
    if not old_sections:
        wrapper = container.find("div", class_="content-section", recursive=False)
        if wrapper:
            old_sections = [wrapper]
    anchor = old_sections[0] if old_sections else container.find(class_="related-section")
    for heading, paragraphs in sections:
        node = make_section(soup, heading, paragraphs)
        if anchor:
            anchor.insert_before(node)
        else:
            container.append(node)
    for node in old_sections:
        node.decompose()


def replace_faq(soup: BeautifulSoup, faq: list[tuple[str, str]]) -> None:
    section = soup.find(class_="faq-section")
    if not section:
        container = soup.select_one("main .container")
        if not container:
            return
        section = soup.new_tag("section", attrs={"class": "faq-section"})
        container.append(section)
    section.clear()
    h2 = soup.new_tag("h2")
    h2.string = "Frequently Asked Questions"
    section.append(h2)
    for question, answer in faq:
        item = soup.new_tag("div", attrs={"class": "faq-item"})
        button = soup.new_tag("button", attrs={"class": "faq-question"})
        button.append(question + " ")
        icon = soup.new_tag("span", attrs={"class": "faq-icon"})
        icon.string = "\u25bc"
        button.append(icon)
        answer_wrap = soup.new_tag("div", attrs={"class": "faq-answer"})
        answer_inner = soup.new_tag("div", attrs={"class": "faq-answer-inner"})
        answer_inner.string = answer
        answer_wrap.append(answer_inner)
        item.extend([button, answer_wrap])
        section.append(item)


def apply_page_copy(path: Path, data: dict, *, tool: bool = False) -> None:
    soup = BeautifulSoup(path.read_text(), "html.parser")
    soup.title.string = data["title"]
    set_meta(soup, "description", data["description"])
    set_property(soup, "og:title", data["title"])
    set_property(soup, "og:description", data["description"])
    set_property(soup, "og:image:alt", data["h1"])
    set_meta(soup, "twitter:title", data["title"])
    set_meta(soup, "twitter:description", data["description"])
    h1 = soup.find("h1")
    if h1:
        h1.string = data["h1"]
    hero = soup.select_one(".tool-hero .container > p")
    if hero:
        hero.string = data["intro"]
    breadcrumb = soup.select_one(".breadcrumb")
    if breadcrumb:
        parts = list(breadcrumb.children)
        if parts:
            parts[-1].replace_with(data["h1"])
    replace_content_sections(soup, data["sections"])
    replace_faq(soup, data["faq"])
    update_jsonld(soup, data["title"], data["description"], data["faq"])
    byline = soup.select_one(".eeat-byline")
    if not byline:
        container = soup.select_one("main .container")
        if container:
            byline = soup.new_tag("div", attrs={"class": "eeat-byline"})
            container.append(byline)
    if byline:
        byline.clear()
        author = soup.new_tag("span", attrs={"class": "author"})
        author.string = "Reviewed by the LetsRandomize Editorial Team"
        separator = soup.new_tag("span", attrs={"class": "sep"})
        separator.string = "|"
        timestamp = soup.new_tag("time", datetime=UPDATED)
        timestamp.string = "Updated Jul 24, 2026"
        byline.extend([author, separator, timestamp])
    if tool:
        scripts = [tag.get("src") for tag in soup.find_all("script") if tag.get("src")]
        if "/assets/js/prompt-generators.js" not in scripts:
            app_script = soup.find("script", src="/assets/js/app.js")
            new_script = soup.new_tag("script", src="/assets/js/prompt-generators.js")
            if app_script:
                app_script.insert_after(new_script)
            else:
                soup.body.append(new_script)
    path.write_text(str(soup))


def update_source_json(slug: str, data: dict, *, guide: bool = False) -> None:
    prefix = "guides" if guide else "tools"
    path = PUBLIC / "_content" / f"{prefix}_{slug}.json"
    if not path.exists():
        return
    source = json.loads(path.read_text())
    source.update({
        "title": data["title"],
        "meta_description": data["description"],
        "h1": data["h1"],
        "intro": data["intro"],
        "sections": [
            {"h2": heading, "content": "\n\n".join(paragraphs), "key_points": []}
            for heading, paragraphs in data["sections"]
        ],
        "key_takeaways": [],
        "faq": [{"question": q, "answer": a} for q, a in data["faq"]],
        "word_count_target": "Approximately 650 words" if guide else "Approximately 400 words",
        "page_type": "guide" if guide else "tool",
        "intent": "informational:learn" if guide else "interactive:generate",
    })
    path.write_text(json.dumps(source, indent=2, ensure_ascii=True) + "\n")


def global_fixes() -> None:
    for path in PUBLIC.rglob("*.html"):
        text = path.read_text()
        original = text
        text = text.replace("LetsRandomize.com", "LetsRandomize.org")
        text = text.replace(
            "How Random Number Generators Work — A Complete Guide",
            "How Random Number Generators Work",
        )
        text = text.replace(
            "All calculations are performed locally in your browser. No data is sent to our servers.",
            PRIVACY_TEXT,
        )
        text = text.replace(
            "No data is sent to our servers. Everything happens locally in your browser.",
            PRIVACY_TEXT,
        )
        text = text.replace(
            "All password checking and generation happens locally in your browser. No data is sent to our servers.",
            PRIVACY_TEXT,
        )
        text = text.replace(
            "All calculations are performed locally in your browser. No data is sent to our servers, ensuring your privacy.",
            PRIVACY_TEXT,
        )
        text = text.replace("By Sam Parker", "Reviewed by the LetsRandomize Editorial Team")
        text = re.sub(
            r'By <a href="/about/"[^>]*>Sam Parker</a>',
            "Reviewed by the LetsRandomize Editorial Team",
            text,
        )
        text = text.replace("Written by <a href=\"/about/\">Sam Parker</a>", "Reviewed by the LetsRandomize Editorial Team")
        text = re.sub(
            r"Built by <a href=\"/about/\"[^>]*>Sam Parker</a>, a data science enthusiast and developer\.",
            "Reviewed by the LetsRandomize Editorial Team.",
            text,
        )
        text = re.sub(
            r"Built by <a href=\"/about/\"[^>]*>Sam Parker</a>\.?",
            "Maintained by the LetsRandomize Editorial Team.",
            text,
        )
        text = text.replace(
            '&middot; <a href="/about/">Sam Parker</a>',
            "&middot; LetsRandomize Editorial Team",
        )
        text = text.replace(
            "<strong>Author:</strong> Sam Parker",
            "<strong>Reviewed by:</strong> LetsRandomize Editorial Team",
        )
        text = text.replace(
            "<strong>Guide by Sam Parker</strong>",
            "<strong>Reviewed by the LetsRandomize Editorial Team</strong>",
        )
        text = text.replace(
            "This typing test runs 100% in your browser &mdash; no data is sent to any server.",
            PRIVACY_TEXT,
        )
        text = text.replace(
            "This chimp test runs 100% in your browser &mdash; no data is sent to any server.",
            PRIVACY_TEXT,
        )
        text = text.replace(
            "This memory test runs 100% in your browser &mdash; no data is sent to any server.",
            PRIVACY_TEXT,
        )
        text = text.replace(
            "This aim trainer runs 100% in your browser &mdash; no data is sent to any server.",
            PRIVACY_TEXT,
        )
        text = text.replace(
            'built by <a href="/about/">Sam Parker</a>, a data science enthusiast and developer.',
            "maintained by the LetsRandomize Editorial Team.",
        )
        text = re.sub(
            r'"author"\s*:\s*\{\s*"@type"\s*:\s*"Person"\s*,\s*"name"\s*:\s*"Sam Parker"\s*,\s*'
            r'"url"\s*:\s*"https://letsrandomize\.org/about/"\s*\}',
            '"author": {"@type": "Organization", "name": "LetsRandomize Editorial Team", '
            '"url": "https://letsrandomize.org/about/"}',
            text,
        )
        text = re.sub(
            r'"author"\s*:\s*\{\s*"@type"\s*:\s*"Person"\s*,\s*"name"\s*:\s*"Sam Parker"\s*\}',
            '"author": {"@type": "Organization", "name": "LetsRandomize Editorial Team", '
            '"url": "https://letsrandomize.org/about/"}',
            text,
        )
        text = text.replace(
            "Maintained by the LetsRandomize Editorial Team., a data science enthusiast. "
            "This test runs 100% in your browser &mdash; no data is sent to any server.",
            "Reviewed by the LetsRandomize Editorial Team. " + PRIVACY_TEXT,
        )
        text = re.sub(r"<script>\s*\}\);\s*</script>", "", text)
        if text != original:
            path.write_text(text)

    date_path = PUBLIC / "guides/how-random-number-generators-work/index.html"
    text = date_path.read_text()
    text = re.sub(
        r'("datePublished"\s*:\s*"2026-03-15"[\s\S]{0,120}?"dateModified"\s*:\s*")[^"]+(")',
        rf"\g<1>{UPDATED}\g<2>",
        text,
    )
    date_path.write_text(text)


def rewrite_about() -> None:
    path = PUBLIC / "about/index.html"
    soup = BeautifulSoup(path.read_text(), "html.parser")
    soup.title.string = "About LetsRandomize - Tools, Methods, and Editorial Policy"
    description = "Learn how LetsRandomize builds, tests, reviews, and maintains free browser-based randomization tools."
    set_meta(soup, "description", description)
    set_property(soup, "og:title", soup.title.string)
    set_property(soup, "og:description", description)
    set_meta(soup, "twitter:title", soup.title.string)
    set_meta(soup, "twitter:description", description)
    set_property(soup, "og:image:alt", "About LetsRandomize")
    for tag in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            data = json.loads(tag.string or "")
        except (TypeError, json.JSONDecodeError):
            continue
        if isinstance(data, dict) and data.get("@type") == "Article":
            data["headline"] = "About LetsRandomize"
            data["author"] = {
                "@type": "Organization",
                "name": "LetsRandomize Editorial Team",
                "url": "https://letsrandomize.org/about/",
            }
            data["dateModified"] = UPDATED
            tag.string = json.dumps(data, indent=2)
    main = soup.select_one("main .container")
    if main:
        main.clear()
        h1 = soup.new_tag("h1")
        h1.string = "About LetsRandomize"
        main.append(h1)
        blocks = [
            ("What LetsRandomize does", [
                "LetsRandomize publishes free browser-based tools for shuffling lists, drawing numbers, forming teams, generating prompts, and making low-stakes random choices.",
            ]),
            ("How the tools are checked", [
                "Interactive pages are tested for their main input, generate, copy, share, and history flows where those controls are present. Random selection uses the browser Web Crypto API when available, with a Math.random fallback for older browsers.",
                "Each tool page should state its actual inputs, outputs, and limits. We correct pages when the description promises a feature the interface does not provide.",
            ]),
            ("How content is reviewed", [
                "The editorial review checks factual claims against the code and interface, removes unsupported claims, and distinguishes random selection from decisions that require judgment. Guides are updated when a tool changes or when search and user data reveal a missing explanation.",
            ]),
            ("Privacy and appropriate use", [
                PRIVACY_TEXT,
                "Random tools are appropriate only when every possible result is acceptable. They should not decide medical, legal, financial, safety, consent, grading, or other high-impact matters.",
            ]),
            ("Corrections and contact", [
                "To report a broken tool, inaccurate statement, or accessibility problem, email navashu72@gmail.com and include the page address and a short description.",
            ]),
        ]
        for heading, paragraphs in blocks:
            main.append(make_section(soup, heading, paragraphs))
        byline = soup.new_tag("p", attrs={"class": "eeat-byline"})
        byline.string = "Reviewed by the LetsRandomize Editorial Team · Updated July 24, 2026"
        main.append(byline)
    for paragraph in soup.select(".footer-bottom p"):
        if "Built by" in paragraph.get_text():
            paragraph.clear()
            paragraph.string = "\u00a9 2026 LetsRandomize.org. All tools are free to use."
    path.write_text(str(soup))


def update_sitemap() -> None:
    paths = {
        "/about/",
        "/guides/how-random-number-generators-work/",
        "/guides/how-to-use-random-name-generator/",
        "/guides/random-generators-for-teachers/",
        "/guides/types-of-randomness/",
        *{f"/tools/{slug}/" for slug in TOOLS},
    }
    sitemap = PUBLIC / "sitemap.xml"
    text = sitemap.read_text()
    for url_path in paths:
        escaped = re.escape(f"https://letsrandomize.org{url_path}")
        text = re.sub(
            rf"(<loc>{escaped}</loc>\s*<lastmod>)[^<]+(</lastmod>)",
            rf"\g<1>{UPDATED}\g<2>",
            text,
        )
    sitemap.write_text(text)


def main() -> None:
    global_fixes()
    rewrite_about()
    for slug, data in TOOLS.items():
        apply_page_copy(PUBLIC / f"tools/{slug}/index.html", data, tool=True)
        update_source_json(slug, data)
    apply_page_copy(PUBLIC / "guides/random-generators-for-teachers/index.html", TEACHERS)
    update_source_json("random-generators-for-teachers", TEACHERS, guide=True)
    apply_page_copy(PUBLIC / "guides/how-to-use-random-name-generator/index.html", NAME_GUIDE)
    apply_page_copy(PUBLIC / "guides/types-of-randomness/index.html", TYPES_GUIDE)
    update_source_json("types-of-randomness", TYPES_GUIDE, guide=True)
    update_sitemap()
    print("LetsRandomize content remediation applied.")


if __name__ == "__main__":
    main()
