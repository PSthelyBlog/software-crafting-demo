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
