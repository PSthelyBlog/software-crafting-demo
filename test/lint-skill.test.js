import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lintSkill } from '../src/lint-skill.js';

const skill = ({ name = 'my-skill', description = 'Use when testing.' } = {}) =>
  `---\nname: ${name}\ndescription: ${description}\n---\n\n# Body\n`;

test('a well-formed skill has no problems', () => {
  assert.deepEqual(lintSkill(skill(), 'my-skill'), []);
});

test('a file without frontmatter is reported', () => {
  assert.deepEqual(lintSkill('# Just a heading\n', 'my-skill'), [
    'missing frontmatter: the file must start with a --- delimited block',
  ]);
});

test('a missing name is reported', () => {
  const text = '---\ndescription: Use when testing.\n---\n';
  assert.deepEqual(lintSkill(text, 'my-skill'), ['missing required field: name']);
});

test('a missing description is reported', () => {
  const text = '---\nname: my-skill\n---\n';
  assert.deepEqual(lintSkill(text, 'my-skill'), ['missing required field: description']);
});

test('a name that differs from the directory name is reported', () => {
  assert.deepEqual(lintSkill(skill({ name: 'other-skill' }), 'my-skill'), [
    'name "other-skill" does not match directory "my-skill"',
  ]);
});

test('quoted field values are read without their quotes', () => {
  const text = skill({ name: '"my-skill"', description: "'Use when testing.'" });
  assert.deepEqual(lintSkill(text, 'my-skill'), []);
});

test('a name with characters other than lowercase letters, digits and hyphens is reported', () => {
  assert.deepEqual(lintSkill(skill({ name: 'My_Skill' }), 'My_Skill'), [
    'name "My_Skill" must use only lowercase letters, digits and hyphens',
  ]);
});

test('a name longer than 64 characters is reported', () => {
  const name = 'a'.repeat(65);
  assert.deepEqual(lintSkill(skill({ name }), name), [
    'name is 65 characters long; the limit is 64',
  ]);
});

test('a name of exactly 64 characters is accepted', () => {
  const name = 'a'.repeat(64);
  assert.deepEqual(lintSkill(skill({ name }), name), []);
});

test('a description longer than 1024 characters is reported', () => {
  const description = 'd'.repeat(1025);
  assert.deepEqual(lintSkill(skill({ description }), 'my-skill'), [
    'description is 1025 characters long; the limit is 1024',
  ]);
});

test('regression: a skill saved with Windows line endings is linted like any other', () => {
  const text = skill().replaceAll('\n', '\r\n');
  assert.deepEqual(lintSkill(text, 'my-skill'), []);
});
