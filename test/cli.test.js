import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CLI = fileURLToPath(new URL('../bin/skill-lint.js', import.meta.url));
const SHOWCASED_SKILL = fileURLToPath(new URL('../skills/software-crafting', import.meta.url));

const run = (...args) => spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });

function skillDirectory(name, skillFileText) {
  const directory = join(mkdtempSync(join(tmpdir(), 'skill-lint-')), name);
  mkdirSync(directory);
  if (skillFileText !== undefined) writeFileSync(join(directory, 'SKILL.md'), skillFileText);
  return directory;
}

test('the showcased software-crafting skill passes its own linter', () => {
  const result = run(SHOWCASED_SKILL);
  assert.equal(result.stderr, '');
  assert.equal(result.stdout, `${SHOWCASED_SKILL}: ok\n`);
  assert.equal(result.status, 0);
});

test('problems are printed to stderr and the exit status is 1', () => {
  const directory = skillDirectory('my-skill', '---\nname: my-skill\n---\n');
  const result = run(directory);
  assert.equal(result.stderr, `${directory}: missing required field: description\n`);
  assert.equal(result.status, 1);
});

test('a directory without SKILL.md is a usage error with exit status 2', () => {
  const directory = skillDirectory('empty');
  const result = run(directory);
  assert.equal(result.stderr, `${directory}: no SKILL.md found\n`);
  assert.equal(result.status, 2);
});

test('running without a directory argument prints usage with exit status 2', () => {
  const result = run();
  assert.equal(result.stderr, 'usage: skill-lint <skill-directory>\n');
  assert.equal(result.status, 2);
});
