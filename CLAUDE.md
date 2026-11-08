# stdnum-js

TypeScript port of [python-stdnum](https://github.com/arthurdejong/python-stdnum): validators for national IDs, tax and VAT numbers, organised as `src/<country>/<number>.ts`.

## Priorities

Correctness over speed. A validator that wrongly accepts or rejects real numbers is worse than no validator. Before anything is committed:

1. **Check against a reference.** python-stdnum is the default reference (see below). Where it is wrong or out of date, cite an official source (government, tax authority, EU/OECD TIN sheets) instead.
2. **Prove the test catches the bug.** New tests must fail without the fix: set the source change aside, run the spec, restore it. The stash is shared with other worktrees, so use a tagged `git stash push -m <tag> -- <file>` and `git stash apply <sha>`, never a bare `git stash pop`.
3. **Run the full gate:** `npm test` and `npm run lint`, and `npx prettier --check` on touched files.
4. **Say what was not verified.** Sources that would not load, assumptions, edge cases left alone: put them in the PR description, not just the chat.

## Commands

- `npm test`: vitest (globals enabled; specs live next to the code as `*.spec.ts`). Jest was removed, so don't use `jest.*` APIs.
- `npm run lint`: eslint plus `tsc --noEmit`. CI also runs `npm run prepublishOnly` and `npm run lint:package` (publint and attw).
- `npx vitest run src/<cc>`: run one country's specs.

## Verifying against python-stdnum

Install it once in a scratch venv and compare results directly:

```bash
python3 -m venv "$TMPDIR/venv" && "$TMPDIR/venv/bin/pip" install python-stdnum
"$TMPDIR/venv/bin/python" -I -c "from stdnum.kr import rrn; print(rrn.validate('9710139019902'))"
```

Module names mostly match (`src/cz/dic.ts` maps to `stdnum.cz.dic`). The exceptions are Python keywords and renames: `is_`, `in_`, `stdnum.ean` (for `gen/ean`), `th.pin` (for `th/idnr`).

### Other references

- **Odoo `base_vat`** ([res_partner.py](https://github.com/odoo/odoo/blob/master/addons/base_vat/models/res_partner.py)): uses python-stdnum, but defines its own `check_vat_<cc>` methods where python-stdnum was wrong or incomplete. If Odoo overrides a country, treat that as a sign python-stdnum may be out of date there. The OCA `l10n_*` repositories cover national IDs.
- **Microsoft Purview** sensitive information type definitions (`learn.microsoft.com/en-us/purview/sit-defn-*`): per-country formats. Built for detecting numbers in text, so they can be looser than the real rule.
- **NetSuite SuiteTax** ([pre-defined formats](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1557742766.html)): lists which countries have a built-in tax registration format. Formats only, and known to accept invalid numbers, so use it for hints, not as proof.

None of these confirm that a number is actually registered; only tax authority services (such as VIES in the EU) do that, which is out of scope for this library.

For a change to check-digit logic, compare many inputs, not a handful. Build the library (`npx tsc -p tsconfig-cjs.json --outDir <tmp>`), take the spec's valid examples, mutate digits, try every final character, and diff `validate()` between the JS build and python-stdnum. This found several real bugs that the specs missed.

## Known pitfalls

- **Check digit 0 (modulus wrap).** The most common bug class here. `weightedSum()` already returns `sum % modulus`, so:
  - `(11 - sum) % 10` gives `1` when the answer should be `0`. Use `((11 - sum) % 11) % 10`, matching Python's `(-s % 11) % 10`.
  - `alphabet[N - sum]` reads past the end when `sum === 0`. Use `alphabet[(N - sum) % N]`.
  - JS `%` keeps the dividend's sign; Python's doesn't. Use `pymod` from `src/util/pymod.ts` when porting Python modulo on possibly negative values.
  - Mod-97 checks are `97 - (n % 97)`, range 1..97. Testing `(n + check) % 97 === 0` also accepts `00`, `98` and `99`.
- `weightedSum()` maps characters missing from `alphabet` to `-1` silently, so check the format before calling it.
- `strings.splitAt()` with negative points on a value shorter than the split keeps the old `substr` semantics on purpose (`format()` output depends on it).
- `substr` is banned by lint; use `slice`. For `substr(a, n)` use `slice(a, a + n)`.
- `toLocaleUpperCase()` (in `cleanUnicode`, `validatePerson`, `validateEntity`) depends on the runtime locale: under Turkish, `i` becomes `İ`. Prefer `toUpperCase()` in new code.

## Adding or changing a validator

- Put sources in the module doc comment, primary sources first. A blog or vendor page that doesn't state the format is not a source.
- A new country must appear in `src/index.ts` in four places: the `import * as XX`, the named `export { ... }` list, the `stdnum` object, and `personValidators`/`entityValidators` where relevant. `src/index.spec.ts` fails if the first three drift apart.
- It also needs a `"./xx"` entry in the `exports` map of `package.json` (same shape as the existing ones); `src/package-exports.spec.ts` fails without it. Insert new entries in place rather than re-sorting, to keep the diff small.
- When a deliberate rule differs from python-stdnum (for example `bg/vat` 10-digit, `ec/ruc` company RUCs, `kr/rrn` since 2020, `tw/ubn` 2023 rule, `kr/brn`, `be/vat`, `cz/rc` after 1985), say so in the doc comment and note it on issue #91.

## Test data

Never use real people's identifiers as fixtures or doc examples, including numbers from public sources such as the OFAC sanctions list. Use official specimen numbers or made-up values of the right shape, and check that each valid example passes the check digit.

## Pull requests

- Only squash merges; the PR title becomes the commit subject, and release-please builds the changelog from it. PR titles must be Conventional Commits (CI checks this): `fix(cc/name): ...`, `feat(cc/name): ...`.
- One validator fix per PR (or one root cause across validators); reference the issue with `Fixes #N`.
- Outside contributors' PRs: CI runs need maintainer approval. To resolve conflicts, merge `main` into their branch (don't force-push); pushing to a fork may need to be done by the maintainer by hand.
- Don't run an outside contributor's code locally; review it statically and rely on CI.
