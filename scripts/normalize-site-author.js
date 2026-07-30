#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || "public");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

let changed = 0;
for (const file of walk(root).filter((target) => target.endsWith(".html"))) {
  const original = fs.readFileSync(file, "utf8");
  let html = original
    .replaceAll("the LetsRandomize editorial team", "Sam Parker")
    .replaceAll("The LetsRandomize editorial team", "Sam Parker")
    .replaceAll("the LetsRandomize Editorial Team", "Sam Parker")
    .replaceAll("The LetsRandomize Editorial Team", "Sam Parker")
    .replaceAll("LetsRandomize Editorial Team", "Sam Parker")
    .replaceAll("the Sam Parker", "Sam Parker")
    .replaceAll("The Sam Parker", "Sam Parker");

  html = html.replace(
    /("author"\s*:\s*\{\s*"@type"\s*:\s*)"Organization"(\s*,\s*"name"\s*:\s*"Sam Parker")/g,
    '$1"Person"$2'
  );

  if (html !== original) {
    fs.writeFileSync(file, html);
    changed += 1;
  }
}

console.log(`Normalized Sam Parker authorship in ${changed} HTML file(s).`);
