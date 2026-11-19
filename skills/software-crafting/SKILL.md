---
name: "software-crafting"
description: "Use when writing, changing, or refactoring code: work test-first in small green steps, refactor explicitly, review with fresh eyes, and report honestly."
---

# Software Crafting

Working code is the minimum. The goal is well-crafted code: correct, readable, easy to change, and delivered with an honest account of its state. Apply this discipline to every feature, bug fix, and refactor.

## 1. Understand before you type

- Read the code you are about to change, its tests, and its neighbours. Match the existing conventions (naming, structure, error handling, test style) even if you would choose differently.
- In an empty or new project there is nothing to read yet: name the first observable behaviour and the lightest test setup that fits the stack, then start the loop.
- Restate the goal as observable behaviour: "given X, when Y, then Z".
- Write a short list of test cases, simplest first, including edge cases and failure paths. This list is your plan.
- If the request is ambiguous and a wrong guess would be expensive, ask. Otherwise state your assumption and proceed.

## 2. The loop: red, green, refactor, commit

Take one case from the list at a time.

1. **Red.** Write one test for the next behaviour: one, even when the next cases on the list are closely related. Run it. Read the failure output before writing any production code, and confirm it fails for the expected reason. A test you have never seen fail proves nothing.
2. **Green.** Write the simplest code that makes it pass. Run the whole relevant suite, not just the new test.
3. **Refactor.** With tests green, improve the design: remove duplication, clarify names, simplify structure. Change no behaviour. Run the tests again.
4. **Commit.** One small commit per green step, with a message that says why. Keep refactoring commits separate from behaviour commits. The red step never reaches the history, so the message is its only record: for a bug fix, say what the failing test showed.

If a step goes wrong, revert to the last green commit and take a smaller step instead of debugging forward through a large diff.

## 3. Special cases

- **Bug fix:** first reproduce the bug with a failing test. Then fix it. The test stays as a regression guard.
- **Code without tests:** before changing it, pin its current behaviour with characterization tests around the area you will touch. Then change it.
- **No test framework:** propose the lightest setup that fits the stack. If the user declines, say exactly how you verified the change by other means.
- **Spike or prototype:** exploration without tests is fine if you label it a spike. Do not present spike code as finished; rebuild it test-first or say plainly that it is unverified.
- **Trivial change** (typo, comment, config value): skip the loop, but still run whatever checks exist.

## 4. Design rules

In priority order, the code should:

1. Pass its tests.
2. Reveal intent: names say what and why; a reader should not need comments to follow the flow.
3. Contain no duplicated knowledge.
4. Have the fewest elements needed. No speculative abstractions, options, or layers for needs that do not exist yet.

Also:

- Keep functions small and at one level of abstraction.
- Leave code you touch slightly better than you found it, but keep the diff focused. Put unrelated cleanups in their own commit or list them as follow-ups.
- Tests are code too: readable, independent, fast, one reason to fail each.

## 5. Integrity (non-negotiable)

- Never weaken, skip, delete, or special-case a test to get to green. If a test seems wrong, stop and say why.
- Never say tests pass without having run them in this session. Quote the actual result.
- Never leave stubs, hard-coded answers, or swallowed errors and call the work done.
- Say what you are unsure about and what you did not verify.
- Push back when a request would damage the codebase. Explain the cost, offer an alternative, then follow the user's decision.

## 6. Review with fresh eyes

Before declaring the work done:

- Re-read the full diff as a reviewer who did not write it. Look for unclear names, missed cases, dead code, leftover debugging, and accidental changes.
- For large or risky changes, have a separate agent with no prior context review the diff against the stated goal, and address its findings.
- Run the full test suite, linter, and type checks one final time.

## 7. Capture what you learn

You do not carry lessons between sessions, so write them down. When the user corrects you, or you discover a project convention, a trap, or a preferred pattern, propose adding a one-line note to the project's instruction file (CLAUDE.md). Keep those notes short and specific.

## 8. Final report

End with a brief summary:

- What changed and why.
- Evidence: the test and check results you actually ran, and which checks (linter, type checker, CI) the project does not have.
- What is not verified or was assumed.
- Follow-ups you noticed but left out of scope.