/**
 * forms-config.js
 * ─────────────────────────────────────────────────────────────
 * Single place to wire Vitar's site to your Google Forms.
 * Every page (index.html, signup.html, feedback.html) loads this
 * file and calls the helper functions below — you never need to
 * touch the HTML/JS in those pages again once this is filled in.
 *
 * HOW TO FILL THIS IN (do this once you've created both forms):
 *
 * 1. Create the WAITLIST form in Google Forms (under vitarhealthcare@gmail.com)
 *    with these fields, in this order:
 *      - Clinic / Hospital name   (Short answer)
 *      - Email                    (Short answer)
 *      - Phone (optional)         (Short answer)
 *      - Source (optional)        (Short answer) — leave this one hidden/unused by
 *                                   visitors, we fill it automatically to know
 *                                   whether the lead came from the homepage or
 *                                   the signup page.
 *
 * 2. Create the FEEDBACK form with these fields, in this order:
 *      - Clinic / Hospital name
 *      - Email (optional)
 *      - Current no-show rate (estimate)
 *      - What do you use today to manage bookings?
 *      - Who books appointments at your clinic?
 *      - Would ₦6,000/month be reasonable for this? (willingness to pay)
 *      - Anything else you'd want this to do?
 *
 * 3. For EACH form: click the 3-dot menu (⋮) top-right → "Get pre-filled link".
 *    Type a dummy value into every field (e.g. "test") → click "Get link" →
 *    "Copy link". Paste that link somewhere (Notes app is fine) — it'll look like:
 *
 *      https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?usp=pp_url
 *        &entry.111111111=test
 *        &entry.222222222=test
 *        &entry.333333333=test
 *
 *    The number after each "entry." — in the SAME ORDER you added the fields —
 *    is what goes into the FIELDS objects below. The long ID after
 *    /forms/d/e/ and before /viewform is your FORM_ID.
 *
 * 4. Replace every "PASTE_..._HERE" placeholder below with the real values.
 *    That's it — nothing else on the site needs to change.
 * ─────────────────────────────────────────────────────────────
 */

const VITAR_FORMS = {
  waitlist: {
    // From the pre-filled link: .../forms/d/e/<THIS PART>/viewform
    formId: "1FAIpQLScv14TqE0tMQO5F4A6FWfPvWpalK4qyV33QYsNgUYeI9gcdNA",
    fields: {
      clinicName: "entry.906255624", // e.g. "entry.111111111"
      email: "entry.2048386696",
      phone: "entry.19888158",
      source: "entry.2003592959",
    },
  },
  feedback: {
    formId: "1FAIpQLSc6h2Xv6ffrP16qPli9wX2QPQH0rF7_BtRySbiRJpFxcKuK5A",
    fields: {
      clinicName: "entry.537912217",
      email: "entry.1427451139",
      noShowRate: "entry.1766799085",
      currentTool: "entry.900432749",
      whoBooks: "entry.2004125205",
      willingnessToPay: "entry.1083622410",
      extraNotes: "entry.2009941995",
    },
  },
};

/**
 * Returns true once real IDs have replaced the placeholders for a given form.
 * Used so the site fails silently (and logs a clear console warning) instead
 * of breaking, if you haven't finished setup yet.
 */
function _vitarFormIsConfigured(formConfig) {
  const values = [formConfig.formId, ...Object.values(formConfig.fields)];
  return values.every((v) => typeof v === "string" && !v.startsWith("PASTE_"));
}

/**
 * Submits a set of {fieldKey: value} pairs to a configured Google Form.
 * Uses mode: "no-cors" because Google Forms doesn't return CORS headers —
 * the request still goes through and the response is just unreadable to us,
 * which is fine since we don't need to read it.
 */
async function _vitarSubmitToGoogleForm(formConfig, values) {
  if (!_vitarFormIsConfigured(formConfig)) {
    console.warn(
      "[Vitar] Google Form is not configured yet — see forms-config.js. Submission skipped (not sent anywhere)."
    );
    return { ok: false, reason: "not_configured" };
  }

  const actionUrl = `https://docs.google.com/forms/d/e/${formConfig.formId}/formResponse`;
  const body = new URLSearchParams();

  for (const [key, entryId] of Object.entries(formConfig.fields)) {
    if (values[key] !== undefined && values[key] !== null && values[key] !== "") {
      body.append(entryId, values[key]);
    }
  }

  try {
    await fetch(actionUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    // With no-cors we can't inspect the response status — Google Forms
    // reliably accepts well-formed submissions, so we treat the fetch
    // not throwing as success.
    return { ok: true };
  } catch (err) {
    console.error("[Vitar] Form submission failed:", err);
    return { ok: false, reason: "network_error" };
  }
}

/**
 * Convenience wrapper for the waitlist widgets on index.html and signup.html.
 * @param {Object} params
 * @param {string} params.email
 * @param {string} [params.clinicName]
 * @param {string} [params.phone]
 * @param {string} [params.source] - e.g. "homepage" or "signup_page"
 */
function submitWaitlist({ email, clinicName = "", phone = "", source = "" }) {
  return _vitarSubmitToGoogleForm(VITAR_FORMS.waitlist, {
    clinicName,
    email,
    phone,
    source,
  });
}

/**
 * Convenience wrapper for feedback.html
 */
function submitFeedback({
  clinicName = "",
  email = "",
  noShowRate = "",
  currentTool = "",
  whoBooks = "",
  willingnessToPay = "",
  extraNotes = "",
}) {
  return _vitarSubmitToGoogleForm(VITAR_FORMS.feedback, {
    clinicName,
    email,
    noShowRate,
    currentTool,
    whoBooks,
    willingnessToPay,
    extraNotes,
  });
}
