// One-Line Roast: The Gadget You Use Every Day
// Entry: a single original roast line about a smartwatch, written to /output/entry.txt
// Plain TypeScript, no dependencies, no dynamic code, no env/network reads.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "My watch congratulates me for standing up, like sitting was the hard part of my day.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Validate the gate: 1-200 Unicode code points, one line, no surrounding
// whitespace, and no trailing newline in the file itself.
function validate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

validate(TEXT);

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");

// Read back and verify byte-identical output.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== TEXT) {
  throw new Error("round-trip verification failed: entry.txt differs from TEXT");
}

console.log(`wrote ${outPath} (${[...TEXT].length} chars, ${Buffer.byteLength(TEXT, "utf8")} bytes)`);
