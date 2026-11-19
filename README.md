# software-crafting-demo

A showcase for the [`software-crafting`](skills/software-crafting/SKILL.md) skill
for Claude Code: test-first work in small green steps, explicit refactoring,
fresh-eyes review, and an honest report.

The showcase is the repository itself. The skill was used to build `skill-lint`,
a tiny zero-dependency linter for `SKILL.md` files, and the first thing that
linter checks is the skill that built it.

## Try it

Requires Node 20 or newer. There is nothing to install.

```sh
npm test              # run the suite (node:test)
npm run lint:skill    # lint the showcased skill
node bin/skill-lint.js path/to/some-skill
```

`skill-lint` exits `0` when the skill is clean, `1` when it has problems
(printed to stderr), and `2` on a usage error. It reports:

- a missing frontmatter block
- a missing `name` or `description`
- a `name` that uses anything but lowercase letters, digits and hyphens
- a `name` that differs from the skill's directory name
- a `name` over 64 or a `description` over 1024 characters

## Read the history

Each commit is one step of the skill's loop. `git log --reverse -p` reads as a
walkthrough.

| Commit | Step | Skill section |
| --- | --- | --- |
| `5458b01` Scaffold | lightest test setup that fits the stack | 3. Special cases |
| `5ce60bc` A well-formed skill has no problems | first test, simplest green (`return []`) | 2. The loop |
| `3644181` … `8d2bac3` | one behaviour per commit, each test seen failing first | 2. The loop |
| `95e05bc` Refactor | design cleanup on green, no behaviour change, own commit | 2. The loop, 4. Design rules |
| `00d0565` Add the skill-lint command | the skill passes its own linter | 2. The loop |
| `3642ac7` Fix: Windows line endings | bug reproduced by a failing test, then fixed | 3. Special cases |
| `ff5ff16` Fix: no trailing newline | found while re-reading the diff as a reviewer | 6. Review with fresh eyes |

## Known limits

- Frontmatter values are read one line at a time. YAML block scalars
  (`description: >`) and other multi-line values are not understood.
- An empty frontmatter block (`---` directly followed by `---`) is reported as
  missing frontmatter rather than as two missing fields.
- Only `name` and `description` are checked; other frontmatter keys are ignored.

## Use the skill

Copy `skills/software-crafting/` into `~/.claude/skills/` (or a project's
`.claude/skills/`), then invoke it with `/software-crafting` or let Claude Code
pick it up when you ask for a code change.

## License

[MIT](LICENSE)
