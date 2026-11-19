#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { lintSkill } from '../src/lint-skill.js';

const EXIT_PROBLEMS = 1;
const EXIT_USAGE = 2;

process.exitCode = main(process.argv[2]);

function main(directory) {
  if (!directory) {
    console.error('usage: skill-lint <skill-directory>');
    return EXIT_USAGE;
  }
  const skillFile = join(directory, 'SKILL.md');
  if (!existsSync(skillFile)) {
    console.error(`${directory}: no SKILL.md found`);
    return EXIT_USAGE;
  }
  const problems = lintSkill(readFileSync(skillFile, 'utf8'), basename(resolve(directory)));
  if (problems.length === 0) {
    console.log(`${directory}: ok`);
    return 0;
  }
  for (const problem of problems) console.error(`${directory}: ${problem}`);
  return EXIT_PROBLEMS;
}
