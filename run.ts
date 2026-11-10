/// <reference types="node" />
// OPTIONAL helper. You do NOT need this file: every class file runs on its own.
//
// Usage (from the workspace folder, the one that has package.json):
//   npx tsx training/run.ts day2 3      -> runs training/day2/03_*.ts
//   npx tsx training/run.ts day3 6      -> runs training/day3/06_*.ts
//   npx tsx training/run.ts day2 all    -> runs every file in day2, one after another
//   npx tsx training/run.ts all         -> runs every file in day2 and day3

import { spawnSync } from "node:child_process";
import { readdirSync, existsSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";

const here: string = dirname(resolve(process.argv[1] ?? "."));
const args: string[] = process.argv.slice(2);

function filesIn(folder: string): string[] {
  const dir = join(here, folder);
  if (!existsSync(dir)) {
    return [];
  }
  return readdirSync(dir)
    .filter((file) => /^\d+_.*\.ts$/.test(file))
    .sort()
    .map((file) => join(dir, file));
}

function runFile(file: string): number {
  console.log(`\n=================== ${relative(here, file)} ===================`);
  const result = spawnSync(`npx tsx "${file}"`, { stdio: "inherit", shell: true });
  return result.status ?? 1;
}

function usage(): never {
  console.log("Usage:");
  console.log("  npx tsx training/run.ts day2 3     run one file (by its number)");
  console.log("  npx tsx training/run.ts day2 all   run every file in a day folder");
  console.log("  npx tsx training/run.ts all        run everything");
  process.exit(1);
}

let selected: string[] = [];

if (args[0] === "all") {
  selected = [...filesIn("day2"), ...filesIn("day3")];
} else if (args.length === 2 && args[1] === "all") {
  selected = filesIn(args[0]);
} else if (args.length === 2) {
  const prefix = args[1].padStart(2, "0") + "_";
  selected = filesIn(args[0]).filter((file) => basename(file).startsWith(prefix));
} else {
  usage();
}

if (selected.length === 0) {
  console.log("No matching file found.");
  usage();
}

let failed = 0;
for (const file of selected) {
  if (runFile(file) !== 0) {
    failed++;
  }
}
process.exit(failed === 0 ? 0 : 1);
