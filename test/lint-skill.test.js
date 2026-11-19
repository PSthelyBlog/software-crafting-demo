import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lintSkill } from '../src/lint-skill.js';

const skill = ({ name = 'my-skill', description = 'Use when testing.' } = {}) =>
  `---\nname: ${name}\ndescription: ${description}\n---\n\n# Body\n`;

test('a well-formed skill has no problems', () => {
  assert.deepEqual(lintSkill(skill(), 'my-skill'), []);
});
