# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server. Expects a backend on `http://127.0.0.1:9091` (see proxy targets in [vite.config.ts](vite.config.ts)).
- `npm run build` — `tsc -b && vite build`. The TypeScript build is part of the pipeline; type errors fail the build.
- `npm run lint` — ESLint over the project.
- `npm run preview` — serve the built `dist/` locally.

No test runner is configured — there is no `npm test`, no Vitest/Jest config, and no `*.test.*` files in the tree. Don't claim "tests pass" without one.

## Architecture

### One SPA, several "apps" mounted by route

[src/App.tsx](src/App.tsx) is the single source of truth for routing. It mounts distinct UIs under different path prefixes, each with its own layout shell:

- `/` — public marketing `Landing`.
- `/proposal`, `/discovery` — sales proposal deck and discovery form.
- `/erp/*` — internal ERP desktop, wrapped by [`AppShell`](src/components/layout/AppShell.tsx) (sidebar nav, omnibar, location switcher).
- `/portal/*` — B2B contractor portal, wrapped by [`PortalLayout`](src/components/layout/PortalLayout.tsx) (themed by `PortalConfig`, JWT-authenticated).
- `/pos` — standalone POS terminal (full-screen, no shell).
- `/driver/*`, `/yard/*` — mobile driver and yard staff apps with their own layouts.

When adding a route, mount it under the right layout — picking the wrong shell is the most common mistake. Routes inside `/erp` use `<Route path="..." element={<AppShell><Outlet /></AppShell>}>`; portal/driver/yard layouts render `<Outlet />` themselves.

### Global password gate

Everything is wrapped in `WorkspaceGate` ([src/App.tsx:78](src/App.tsx)), which checks for a sessionStorage flag and otherwise renders [`ProposalPassword`](src/pages/proposal/ProposalPassword.tsx). The password is hardcoded (`HowReedWins2026`). This is a presales demo, not real auth — don't add features that depend on identity from this gate. Real per-user auth lives in `PortalService` (JWT in `localStorage` under `portal_token`).

### Service layer

`src/services/*Service.ts` modules are the only thing that should call the backend. They all read `import.meta.env.VITE_API_URL` (empty in dev — relative paths hit the Vite proxy; absolute in prod, baked in at Docker build time).

Two patterns coexist:

- **[`PortalService`](src/services/PortalService.ts)** — JWT bearer auth, retry, and timeout via the local `fetchWithRetry` helper. Use this shape for any new portal-facing call.
- **Most others** (e.g. [`QuoteService`](src/services/QuoteService.ts)) — bare `fetch`, no auth, no retry. Internal ERP endpoints.

Don't introduce a third pattern. If a new service needs auth/retry, mirror `PortalService`.

### Vite dev proxy

[vite.config.ts](vite.config.ts) proxies a long allowlist of path prefixes (`/api`, `/products`, `/customers`, `/vendors`, `/orders`, `/quotes`, `/invoices`, `/locations`, `/health`, `/activities`, `/contacts`, `/documents`, `/gl`, `/parsing`, `/price_levels`, `/pricing`, `/purchase-orders`, `/sales-team`, `/uploads`) to `127.0.0.1:9091`. If a service hits a new prefix in dev, add it to this list or the request will 404 against the Vite dev server itself.

### POS offline machinery

The POS terminal works offline. [src/lib/offlineStore.ts](src/lib/offlineStore.ts) wraps IndexedDB (database name `gable-pos-offline`) with two stores: a cached `catalog` and a `pendingTransactions` queue. [src/lib/useOfflineSync.ts](src/lib/useOfflineSync.ts) is the React hook that monitors `navigator.onLine`, auto-syncs the queue against `POST /api/pos/sync` when connectivity returns, and refreshes the catalog from `GET /api/pos/catalog`. Anything POS-related needs to keep working with `VITE_API_URL` unreachable.

### Production deployment

Multi-stage [Dockerfile](Dockerfile) → static SPA served by nginx using [nginx.conf.template](nginx.conf.template) (SPA fallback to `index.html`, asset cache headers). Railway-style: nginx `listen ${PORT}` is filled at runtime by `envsubst`. `VITE_API_URL` is a build-time `ARG` — changing the API URL requires rebuilding the image, not just restarting it.

Concretely:

- **Hosting**: Railway. Project `reed-portal-v2` (id `908fc4ee-c4ce-494a-802f-1ec9c0fd6a0a`), single service `reed-app` (id `d79dc103-501d-4ca6-ab4e-b7c266215529`), single environment `production` (id `00543a18-3343-44d1-988e-62155fc1cfa4`). Operate via the `railway` CLI (`brew install railway`). Auth is wired via `RAILWAY_API_TOKEN` in [.claude/settings.local.json](.claude/settings.local.json) (gitignored), so commands like `railway logs --service reed-app`, `railway variables --service reed-app`, `railway redeploy` work out of the box without `railway login`.
- **DNS**: Cloudflare. Zone `gablelbm.com` (id `345f8f7cd703a68756401b8b9f39552b`); production hostname is `reed.gablelbm.com`. Operate via `wrangler` (`npm i -g wrangler`) for Workers/KV/R2, or hit the REST API directly (`curl -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" https://api.cloudflare.com/client/v4/zones/345f8f7cd703a68756401b8b9f39552b/dns_records`) for DNS edits. Auth via `CLOUDFLARE_API_TOKEN` (token has zone-DNS-edit + workers-scripts-edit scopes); `CLOUDFLARE_ACCOUNT_ID` is also set for wrangler.

To rotate credentials: revoke at https://railway.com/account/tokens or https://dash.cloudflare.com/profile/api-tokens, generate fresh, and replace the values in [.claude/settings.local.json](.claude/settings.local.json) (Claude reads `env` block at session start — restart Claude after rotation). Never commit this file — it is gitignored, but double-check `git status` before any `git add .claude`.

## Conventions

- **Brand in transition.** External name is "Reed Building Materials" / "Reed Building Supply" (see recent commits). Internal identifiers still use the previous brand: Tailwind tokens (`gable-green`, `deep-space`, `slate-steel`, `surface-2/3`), IndexedDB name (`gable-pos-offline`), `package.json` name (`gablexhardscape-app`), and the boot loader logo in [index.html](index.html). Don't bulk-rename these unless the user asks — the rebrand has been deliberately partial so far.
- **`verbatimModuleSyntax: true`** in [tsconfig.app.json](tsconfig.app.json) — type-only imports must use `import type { Foo } from '...'`. Mixing values and types in one import will fail to build.
- **`noUnusedLocals` and `noUnusedParameters`** are on. Prefix unused params with `_` or remove them; the build will fail otherwise.
- **Dark-only.** `darkMode: ["class"]` is configured but only dark CSS variables are defined in [src/index.css](src/index.css). Don't write light-mode-conditional styles.
- **Conditional classes** go through `cn()` from [src/lib/utils.ts](src/lib/utils.ts) (clsx + tailwind-merge). Don't string-concat Tailwind classes by hand.
- **No path aliases.** Imports are relative (`../../lib/utils`); there's no `@/` alias configured.
