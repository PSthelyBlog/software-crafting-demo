# Project notes

- Work with the `software-crafting` skill: one failing test, simplest green, refactor, commit.
- No dependencies. Tests use `node:test`; run `npm test` and `npm run lint:skill` before committing.
- `lintSkill` returns problem strings in a fixed order (missing fields, name, lengths); tests assert the exact array.
- The commit history is the showcase. Keep refactors in their own commits and do not squash.
- `skills/software-crafting/SKILL.md` is the artefact on display; do not edit it to satisfy the linter.
