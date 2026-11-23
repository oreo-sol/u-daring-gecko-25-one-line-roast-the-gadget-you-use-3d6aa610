// One-line roast of the gadget I use most: my smartwatch.
// Writes the roast to entry.txt with no trailing newline.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "My watch congratulates me for standing up, like sitting was the hard part of my day.";

// Validate the roast before writing: one line, 1-200 code points,
// no surrounding whitespace. Rewritten fresh in a post-opening session.
function validate(text: string): void {
  // Count Unicode code points, not UTF-16 code units.
  const points = [...text].length;
  if (points < 1 || points > 200) {
    throw new Error(`expected 1-200 code points, got ${points}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have surrounding whitespace");
  }
}

function main(): void {
  validate(TEXT);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf8");

  // Read back and verify the written bytes are identical.
  const written = readFileSync(outPath, "utf8");
  if (written !== TEXT) {
    throw new Error("read-back mismatch: entry.txt differs from TEXT");
  }
}

main();
