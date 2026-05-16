# Codex Guide - conecta-bem/web

Read `../AGENTS.md` when a task may touch the API contract, auth/token behavior,
generated Kubb output, deployment URLs, or local runtime ports.

## Current Stack

- Runtime/package manager: Node.js with `npm`.
- Framework: Next.js 15 App Router with React 18 and TypeScript strict mode.
- Styling/UI: Tailwind CSS 3, MUI 6, MUI X Date Pickers, Emotion, lucide-react, and
  existing custom icon components.
- Data fetching: Axios, TanStack React Query, Kubb-generated hooks, and selected
  handwritten hooks.
- Auth: NextAuth plus local token/cookie helpers for backend JWT flows.
- CMS/analytics: Prismic and Google Tag Manager.
- Tests: Jest/React Testing Library for unit/component/page tests; Cypress for E2E
  and accessibility flows.
- Default local port: Next.js defaults to `3000`; use `3001` or another free port
  when the backend is running on `3000`.

## Source Map

- `src/app/**` contains Next.js App Router routes and layouts.
- `src/app/(auth)/auth/**` contains login, OTP confirmation, and registration flows.
- `src/app/(public)/**` contains public pages such as home, search, address,
  scheduling, appointment details, and error/access pages.
- `src/app/api/auth/[...nextauth]/route.ts` contains NextAuth route handling.
- `src/components/**` contains shared reusable UI components.
- `src/features/**` contains feature modules, components, hooks, adapters, and
  services.
- `src/libs/api.ts` is the handwritten Axios API client.
- `src/libs/kubbClient.ts` is the Kubb client transport and injects auth tokens.
- `src/kubb/**` is generated API hooks, schemas, and types.
- `src/providers/**` composes app-level providers.
- `src/stores/**` contains Zustand state.
- `src/types/**` and `src/utils/**` contain shared types and utilities.
- `src/__tests__/**` contains Jest test suites and local testing docs.
- `cypress/**` contains E2E/support code and screenshots.

## Commands

```bash
npm install
npm run dev
npm run dev -- -p 3001
npm run build
npm run lint
npm run lint:fix
npm run format
npm run typecheck
npm test
npm run coverage
npm run storybook
npm run build-storybook
npm run generate
```

`npm run generate` uses `kubb.config.ts`; set `KUBB_SWAGGER_URL` when generating from
a local backend Swagger document instead of the deployed default.

## Frontend Rules

- Prefer existing feature folders and shared components before adding new structure.
- Use the `@/*` alias for imports from `src/**`.
- Use generated Kubb hooks/types from `src/kubb/**` for API-backed React Query flows
  when an endpoint exists there. Keep custom behavior in feature hooks or service
  wrappers instead of editing generated files.
- Keep auth/token behavior centralized in `src/libs/kubbClient.ts`, `src/libs/api.ts`,
  NextAuth route code, and existing auth hooks.
- Guard browser-only APIs during SSR and server components.
- Keep reusable copy in pt-BR and match existing page language.
- Prefer existing MUI/Tailwind patterns. Use lucide-react or existing icon components
  for icon buttons and provide accessible names for icon-only controls.
- Do not hand-edit generated Kubb files under `src/kubb/**`; regenerate them.

## API Contract Rules

- The backend currently exposes root-mounted routes such as `/auth/sendOTP`,
  `/auth/checkOTP`, `/user`, `/search/professionals`, and `/appointments/me`.
- `NEXT_PUBLIC_API_URL` should point at the backend origin for current routes, for
  example `http://localhost:3000` in local development.
- If backend Swagger changes, regenerate `src/kubb/**` with `npm run generate` and
  review call sites for payload changes.
- Keep `withCredentials` and `Authorization` behavior intentional; do not introduce
  ad hoc clients that bypass the existing auth path for authenticated requests.

## Validation

- For ordinary frontend changes, run `npm run typecheck` and `npm run lint`.
- For component/page behavior, run `npm test` or a focused Jest suite.
- For API contract changes, regenerate Kubb output and run at least typecheck plus
  focused tests for affected hooks/pages.
- For browser flows, auth, registration, scheduling, or accessibility changes, run or
  update relevant Cypress/Jest coverage and report any skipped checks.
