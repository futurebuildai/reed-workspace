/**
 * discovery-form.gs — Apps Script Web App backing the Discovery Form.
 *
 * What it does:
 *   - Accepts POST { submission_id, identity?, field?, finalize? } from the form
 *   - Upserts a row in the Discovery sheet keyed by submission_id
 *   - On finalize: marks status='final' AND posts a notification to the Google Chat space
 *
 * Setup (one-time):
 *   1. Open the target sheet in your browser
 *   2. Extensions → Apps Script
 *   3. Replace Code.gs with this file's contents
 *   4. File → Project Settings → check "Show appsscript.json" (optional, for config)
 *   5. Deploy → New deployment → Type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   6. Copy the Web App URL and set it as VITE_DISCOVERY_WEBHOOK_URL in Railway
 *
 * Re-deploy after any code change: Deploy → Manage deployments → edit → New version
 */

const SHEET_ID = '1dafKQufzgapZDseom0AhwcU9iWwEBOLOBRbT2q2U0aY';
const TAB_NAME = 'Discovery';
const CHAT_WEBHOOK = 'https://chat.googleapis.com/v1/spaces/AAQAzw-J0lI/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=gOXlEiZqKRt6KhXBEQol8sQyG-6jVzikiWbCvgk2GCI';

const COLUMNS = [
  'submission_id', 'started_at', 'updated_at', 'status',
  'name', 'email', 'company',
  'user_seats', 'locations', 'ai_layer',
  'sku_count', 'qb_type', 'costing_type',
  'gmv_volume', 'revenue_split', 'terminals', 'invoicing_process',
  'fleet_size', 'gps_routing'
];

const SECTIONS = {
  'INFRASTRUCTURE & SCALE': ['user_seats', 'locations', 'ai_layer'],
  'DATA & MIGRATION': ['sku_count', 'qb_type', 'costing_type'],
  'PAYMENTS & REVENUE': ['gmv_volume', 'revenue_split', 'terminals', 'invoicing_process'],
  'LOGISTICS': ['fleet_size', 'gps_routing']
};

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const { submission_id, field, finalize, identity } = body;

    if (!submission_id) {
      return jsonResponse({ ok: false, error: 'submission_id required' });
    }

    const sheet = getOrCreateSheet();
    const row = upsertRow(sheet, submission_id);

    if (identity) {
      if (identity.name) setCell(sheet, row, 'name', identity.name);
      if (identity.email) setCell(sheet, row, 'email', identity.email);
      if (identity.company) setCell(sheet, row, 'company', identity.company);
    }

    if (field && field.id) {
      setCell(sheet, row, field.id, field.value || '');
    }

    if (finalize) {
      setCell(sheet, row, 'status', 'final');
      notifyChat(sheet, row);
    }

    setCell(sheet, row, 'updated_at', new Date().toISOString());

    return jsonResponse({ ok: true, submission_id, row });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

// GET handler so you can sanity-check the deploy URL in a browser
function doGet() {
  return jsonResponse({ ok: true, status: 'discovery-form webhook live' });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(TAB_NAME);
  }
  // Idempotent header sync
  const lastCol = Math.max(sheet.getLastColumn(), COLUMNS.length);
  const currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0]
    .slice(0, COLUMNS.length).join('|');
  if (currentHeaders !== COLUMNS.join('|')) {
    sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
  }
  return sheet;
}

function upsertRow(sheet, submission_id) {
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < ids.length; i++) {
      if (ids[i][0] === submission_id) return i + 2;
    }
  }
  // Append new row with init values
  const newRow = lastRow + 1 < 2 ? 2 : lastRow + 1;
  const now = new Date().toISOString();
  sheet.getRange(newRow, 1).setValue(submission_id);
  sheet.getRange(newRow, COLUMNS.indexOf('started_at') + 1).setValue(now);
  sheet.getRange(newRow, COLUMNS.indexOf('status') + 1).setValue('draft');
  return newRow;
}

function setCell(sheet, row, columnName, value) {
  const col = COLUMNS.indexOf(columnName);
  if (col === -1) return;
  sheet.getRange(row, col + 1).setValue(value);
}

function notifyChat(sheet, row) {
  const values = sheet.getRange(row, 1, 1, COLUMNS.length).getValues()[0];
  const data = {};
  COLUMNS.forEach((col, i) => { data[col] = values[i]; });

  let text = `🚀 *Phase 0 Discovery Audit Completed: ${data.company || 'Reed Building Materials'}*\n\n`;
  text += `*Submitter:* ${data.name || 'Unknown'} <${data.email || 'no email'}>\n`;
  text += `*Submission ID:* ${data.submission_id}\n`;
  text += `*Started:* ${data.started_at} | *Finalized:* ${data.updated_at}\n\n`;

  Object.entries(SECTIONS).forEach(([title, fields]) => {
    text += `*${title}*\n`;
    fields.forEach(f => {
      text += `• *${f}:* ${data[f] || '_(no response)_'}\n`;
    });
    text += `\n`;
  });

  UrlFetchApp.fetch(CHAT_WEBHOOK, {
    method: 'post',
    contentType: 'application/json; charset=UTF-8',
    payload: JSON.stringify({ text }),
    muteHttpExceptions: true
  });
}
