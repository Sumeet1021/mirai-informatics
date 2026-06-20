/**
 * check-web3forms-submissions.js
 *
 * Verifies that submissions from your AuditForm are actually being
 * received by Web3Forms. Run this LOCALLY (Node.js) — never in the
 * browser or in frontend code, since it uses your account-level
 * secret API key (w3f_live_...), which can read ALL your forms.
 *
 * Usage:
 *   WEB3FORMS_API_KEY=w3f_live_xxxxxxxx node check-web3forms-submissions.js
 *
 * Optionally filter to one form by name:
 *   WEB3FORMS_API_KEY=w3f_live_xxxxxxxx node check-web3forms-submissions.js "Free Data Audit"
 */

const API_KEY = process.env.WEB3FORMS_API_KEY;
const FORM_NAME_FILTER = process.argv[2]; // optional

if (!API_KEY) {
  console.error(
    "Missing API key. Set it as an environment variable, e.g.:\n" +
      "  WEB3FORMS_API_KEY=w3f_live_xxxx node check-web3forms-submissions.js"
  );
  process.exit(1);
}

const BASE_URL = "https://api.web3forms.com/v1";

async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });

  if (res.status === 401) {
    throw new Error("401 Unauthorized — the API key is invalid or has been revoked.");
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`429 Rate limited — retry after ${retryAfter || "a few"} seconds.`);
  }
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Request failed (${res.status}): ${body}`);
  }
  return res.json();
}

async function main() {
  console.log("Fetching your Web3Forms forms list...\n");

  const formsResp = await apiGet("/forms");
  const forms = formsResp.data || [];

  if (forms.length === 0) {
    console.log("No forms found on this account. Double-check the API key belongs to the right account.");
    return;
  }

  console.log("Forms found:");
  for (const f of forms) {
    console.log(`  - "${f.form_name}"  (form_id: ${f.form_id})  total_count: ${f.total_count}`);
  }
  console.log("");

  let targetForm = forms[0];
  if (FORM_NAME_FILTER) {
    const match = forms.find(
      (f) => f.form_name.toLowerCase() === FORM_NAME_FILTER.toLowerCase()
    );
    if (!match) {
      console.log(`No form named "${FORM_NAME_FILTER}" found. Showing data for "${forms[0].form_name}" instead.`);
    } else {
      targetForm = match;
    }
  }

  console.log(`Checking recent submissions for "${targetForm.form_name}" (total_count: ${targetForm.total_count})...\n`);

  // NOTE: the exact query params/response shape for /v1/submissions weren't
  // fully shown in the docs you pasted. This assumes a form_id filter and a
  // small page size, which is the common convention. If Web3Forms expects
  // different param names, adjust the query string below to match their
  // actual /v1/submissions reference.
  try {
    const submissionsResp = await apiGet(
      `/submissions?form_id=${encodeURIComponent(targetForm.form_id)}&limit=5`
    );
    const submissions = submissionsResp.data || [];

    if (submissions.length === 0) {
      console.log("No submissions returned. If total_count above is > 0, the query params may need adjusting to match the actual API spec.");
      return;
    }

    console.log(`Most recent ${submissions.length} submission(s):\n`);
    submissions.forEach((s, i) => {
      console.log(`${i + 1}.`, JSON.stringify(s, null, 2));
    });
  } catch (err) {
    console.error("Could not fetch submissions:", err.message);
    console.error(
      "\nIf this errors on param names, check the full /v1/submissions section " +
        "of the Web3Forms docs for the exact expected query parameters."
    );
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});