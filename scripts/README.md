# Discovery Form — Apps Script backend

The Discovery Form (`/discovery` route) writes per-field saves to a Google Sheet via an Apps Script Web App, and posts a single Google Chat notification on final submit. The Apps Script holds all secrets server-side; the React app just POSTs JSON to its deploy URL.

## One-time setup

1. Open the target sheet: <https://docs.google.com/spreadsheets/d/1dafKQufzgapZDseom0AhwcU9iWwEBOLOBRbT2q2U0aY>
2. **Extensions → Apps Script**
3. Replace the contents of `Code.gs` with [discovery-form.gs](discovery-form.gs)
4. Save (Ctrl/Cmd + S)
5. **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me** (the sheet owner)
   - Who has access: **Anyone**
6. Click Deploy. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/AKfycb…/exec`).
7. Set it on Railway:
   ```
   railway variables --service reed-app --set VITE_DISCOVERY_WEBHOOK_URL=<paste url>
   ```
   (Or via the Railway dashboard → reed-portal-v2 → reed-app → Variables.)
8. Trigger a redeploy (Railway auto-redeploys when env vars change).

## Sanity check

After deploy, hit the Web App URL in a browser. You should see:
```json
{"ok": true, "status": "discovery-form webhook live"}
```

That confirms the deploy is reachable. The `Discovery` tab will be created on the first POST from the form.

## Re-deploy after script changes

Apps Script Web Apps version their deployments. After editing `discovery-form.gs`:

1. **Deploy → Manage deployments**
2. Click the pencil icon on the active deployment
3. Version: **New version**
4. Click Deploy

The same URL stays valid — no env var change needed.

## Schema

Each row is one submission, keyed by `submission_id` (a client-generated UUID stored in the prospect's localStorage). Columns:

| Group | Columns |
|---|---|
| Meta | `submission_id`, `started_at`, `updated_at`, `status` (`draft` or `final`) |
| Identity | `name`, `email`, `company` |
| Infrastructure | `user_seats`, `locations`, `ai_layer` |
| Migration | `sku_count`, `qb_type`, `costing_type` |
| Payments | `gmv_volume`, `revenue_split`, `terminals`, `invoicing_process` |
| Logistics | `fleet_size`, `gps_routing` |

Edit the `COLUMNS` and `SECTIONS` constants in `discovery-form.gs` if you add/remove form fields. The header row auto-syncs on every request, so a new column appears as soon as the script runs.

## How the form interacts

- **Per-field, debounced (800ms):** `POST { submission_id, field: { id, value } }`
- **Final submit:** `POST { submission_id, finalize: true }` — flips `status` to `final` and pings Chat space `AAQAzw-J0lI`
- **Identity update:** `POST { submission_id, identity: { name, email, company } }` — typically sent at first save
