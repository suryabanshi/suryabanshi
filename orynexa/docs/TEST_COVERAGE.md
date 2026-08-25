# Test Coverage Analysis & Improvement Proposal

_Project: `orynexa` (Next.js 16 · React 19 · TypeScript)_

## 1. Current state

**There is no automated test coverage of any kind.**

- No test runner is installed (`package.json` `devDependencies` has no Jest, Vitest, Playwright, or Cypress).
- No test script exists — `scripts` is limited to `dev`, `build`, `start`, `lint`.
- There are no `*.test.*` / `*.spec.*` files anywhere in the repo.
- There is no CI workflow (`.github/workflows/`) to run tests or report coverage.

Effective line/branch coverage today: **0%.** The only automated safety net is `eslint`
and the TypeScript compiler, which catch type errors but verify no runtime behavior.

## 2. Where the risk actually is

Most of the codebase is presentational and low-risk. The pages (`src/app/**/page.tsx`)
have no client state, no data fetching, and no branching — a bug there is visual and
caught in review. The real, testable logic is concentrated in four files:

| File | Kind | Logic present | Risk |
|------|------|---------------|------|
| `src/app/api/contact/route.ts` | API route | Body parsing, required-field validation, email regex, normalization, env-gated webhook forwarding + error handling | **High** — the site's only lead-capture path; a silent break loses business |
| `src/components/ContactForm.tsx` | Client component | `fetch` submit, submitting/submitted/error state machine, server-vs-network error handling | **High** — the user-facing half of the same flow |
| `src/components/Navbar.tsx` | Client component | Scroll-position state, mobile menu toggle, listener cleanup | Medium |
| `src/components/CoreNetwork.tsx` | Client component | Canvas/`requestAnimationFrame` particle animation | Low (visual, expensive to test) |

The contact flow (route + form) is both the highest-value and the easiest-to-test part
of the app, which makes it the obvious place to start.

## 3. Recommended tooling

Adopt a lightweight, Vite-native stack that matches Next.js + React 19:

- **Vitest** — fast, ESM-first test runner with built-in coverage (`v8`/`istanbul`).
- **@testing-library/react** + **@testing-library/user-event** + **jsdom** — component
  and interaction tests that assert behavior, not implementation.
- **Playwright** (optional, phase 3) — one end-to-end pass over the contact happy path.

Concrete additions:

```jsonc
// package.json scripts
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

Add a minimal GitHub Actions workflow that runs `lint`, `tsc --noEmit`, and
`test:coverage` on every PR, so coverage never silently regresses back to zero.

## 4. Proposed test areas, in priority order

### Priority 1 — Contact API route (`src/app/api/contact/route.ts`)

Pure request-in/response-out logic; testable by calling `POST` with a mocked
`NextRequest` and stubbing `fetch`. Cases to cover:

- **Invalid JSON body** → `400 { error: "Invalid request body." }`.
- **Missing required fields** (each of `name`, `country`, `email`, `service`,
  `problem`, and combinations) → `422` with the missing fields listed.
- **Whitespace-only required field** → treated as missing (the `.trim()` guard).
- **Invalid email** (`no-at`, `a@b`, `a@b.`, spaces) → `422 "Invalid email address."`.
- **Valid payload** → `200 { ok: true }`, and the built `lead` is normalized
  (name/country trimmed, email lowercased, optional fields defaulted to `""`).
- **Webhook forwarding**: with `ORYNEXA_CRM_WEBHOOK_URL` set, `fetch` is called once
  with the correct URL, method, headers, and serialized `lead`.
- **Webhook resilience**: a non-`ok` webhook response and a thrown `fetch` error must
  both be logged **without** failing the user's request (still returns `200`). This is
  the most bug-prone branch and the most important to lock down.
- **No webhook configured**: `fetch` is never called.

### Priority 2 — ContactForm submit behavior (`src/components/ContactForm.tsx`)

Render with Testing Library, mock `fetch`, assert the state machine:

- Submitting disables the button and shows the "Processing" state.
- `res.ok` → success panel ("System Entry Received") replaces the form.
- Non-ok response → server's `error` message is surfaced; falls back to the generic
  message when the body has no `error`.
- Thrown `fetch` (offline) → the "Network error" message is shown.
- `dark` prop renders without error (smoke) — guards the styling branch.

### Priority 3 — Navbar interactivity (`src/components/Navbar.tsx`)

- Mobile menu toggles open/closed on button click.
- Scroll past the threshold flips the `scrolled` state (dispatch a `scroll` event).
- The `scroll` listener is removed on unmount (no leak / no post-unmount `setState`).

### Priority 4 — Render / smoke tests for the rest

Cheap regression guards that catch crashes and broken imports:

- Each page (`about`, `services`, `projects`, `systems`, `contact`, home) renders.
- Presentational components (`ServiceCard`, `ProjectCard`, `PricingCard`,
  `ProcessTimeline`, `Footer`) render with representative props and show key content.

### Priority 5 (optional) — End-to-end happy path

One Playwright test: fill the contact form, submit against a mocked/stubbed API,
assert the success panel. Validates the route + form wired together.

## 5. Suggested coverage targets

Rather than chase a global percentage over largely-static JSX, set targets where logic lives:

- `src/app/api/**` and `src/components/ContactForm.tsx`: **90%+ branches** (business-critical).
- `src/components/*` (interactive): **~70%**.
- Static pages/components: render smoke tests only — don't over-invest.

Deliberately **skip** deep coverage of `CoreNetwork.tsx` (canvas animation) — a render
smoke test that the canvas mounts is enough; pixel-level assertions aren't worth the cost.

## 6. Suggested rollout

1. **Phase 1** — Add Vitest + Testing Library, wire up `test` scripts, and write the
   Priority 1 API route tests. This alone protects the revenue-relevant path.
2. **Phase 2** — Add the CI workflow (lint + typecheck + tests + coverage gate), then
   Priority 2 and 3 component tests.
3. **Phase 3** — Backfill Priority 4 smoke tests and, if desired, the Priority 5 E2E pass.
