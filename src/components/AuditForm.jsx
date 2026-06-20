import { useState, useCallback, useRef } from "react";

// ─── ICONS ───────────────────────────────────────────────────────
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);


const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m8 12 3 3 5-6" />
  </svg>
);

// ─── CONSTANTS ───────────────────────────────────────────────────
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "29903a1c-2e5d-43f4-badf-9a014bd36229";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialForm = { name: "", company: "", email: "", whatsapp: "", message: "" };

const trustIndicators = [
  { icon: <ShieldIcon />, text: "100% Confidential" },
  { icon: <ClockIcon />, text: "Response within 24 Hours" },
  { icon: <TargetIcon />, text: "No Obligation, Completely Free" },
];

// ─── COMPONENT ───────────────────────────────────────────────────
const AuditForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  // FIX: A ref that stays in sync with formData state.
  // Without this, handleSubmit (wrapped in useCallback) captures a stale
  // closure over the initial empty formData, so validate() always sees ""
  // and returns early — meaning fetch() is NEVER called. The browser then
  // falls back to a native GET submission, which is exactly what Web3Forms
  // reports as "Please use POST method to submit the form".
  const formDataRef = useRef(initialForm);

  // FIX: Update both state (for rendering) and ref (for handleSubmit to read)
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      formDataRef.current = next; // keep ref current so handleSubmit sees latest values
      return next;
    });
  }, []); // empty deps is now safe because we read from ref, not state

  const validate = (data) => {
    if (!data.name.trim()) return "Please enter your name.";
    if (!data.email.trim()) return "Please enter your email address.";
    if (!EMAIL_REGEX.test(data.email.trim())) return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent native GET form submission

    // Always read from ref — never from the potentially-stale formData closure
    const currentData = formDataRef.current;

    const validationError = validate(currentData);
    if (validationError) {
      setErrorMsg(validationError);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      // Use FormData so the browser sets the correct multipart Content-Type
      // boundary automatically. Do NOT set Content-Type manually.
      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      payload.append("name",       currentData.name.trim());
      payload.append("company",    currentData.company.trim());
      payload.append("email",      currentData.email.trim());
      payload.append("whatsapp",   currentData.whatsapp.trim());
      payload.append("message",    currentData.message.trim()); // must be "message", not "requirement"
      payload.append("subject",    "New Free Data Audit Request — DataPulse");
      payload.append("replyto",    currentData.email.trim());

      // Log payload before sending
      console.log("=== Web3Forms payload ===");
      for (const [key, val] of payload.entries()) {
        console.log(`  ${key}:`, val);
      }
      console.log("  endpoint:", WEB3FORMS_ENDPOINT);
      console.log("  method  : POST");

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST", // explicit POST — never rely on default
        headers: {
          Accept: "application/json",
          // ⚠️ No Content-Type header — browser must auto-set it with
          // the correct multipart/form-data boundary for FormData bodies
        },
        body: payload,
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        // Response had no JSON body — fall through to response.ok check
      }

      // Log raw Web3Forms response
      console.log("=== Web3Forms response ===");
      console.log("  HTTP status:", response.status);
      console.log("  body:", result);

      if (!response.ok || result.success === false) {
        let apiError = result?.message;
        if (!apiError) {
          if (response.status === 403)
            apiError = "Web3Forms rejected this request (403). Check that the access key is correct and this domain is authorized.";
          else if (response.status === 422)
            apiError = "Web3Forms could not process the submitted fields. Please check the form and try again.";
          else if (response.status === 429)
            apiError = "Too many requests right now. Please wait a moment and try again.";
          else
            apiError = `Submission failed (HTTP ${response.status}). Please try again.`;
        }
        throw new Error(apiError);
      }

      // Success — reset form
      formDataRef.current = initialForm;
      setFormData(initialForm);
      setStatus("success");

    } catch (err) {
      console.error("Audit form submission error:", err);
      setStatus("error");
      setErrorMsg(
        err?.message ||
        "Something went wrong sending your request. Please try again or email us directly."
      );
    }
  };

  const closePopup = () => setStatus("idle");

  return (
    <section id="audit" className="dp-audit">
      <style>{`
        .dp-audit { position: relative; padding: 110px 24px; background: #f9fafb; }
        .dp-audit-inner { max-width: 760px; margin: 0 auto; }
        .dp-audit-tag {
          display: block; text-align: center; font-weight: 600; font-size: 0.8rem;
          letter-spacing: 0.06em; text-transform: uppercase; color: #059669; margin-bottom: 14px;
        }
        .dp-audit-title {
          text-align: center; font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800;
          color: #0f172a; margin: 0 0 16px; letter-spacing: -0.02em;
        }
        .dp-audit-subtitle {
          text-align: center; color: #6b7280; font-size: 1.02rem;
          max-width: 560px; margin: 0 auto 36px; line-height: 1.7;
        }
        .dp-audit-trust { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-bottom: 44px; }
        .dp-audit-trust-item {
          display: flex; align-items: center; gap: 8px; background: #ffffff;
          border: 1px solid #e5e7eb; color: #374151; font-size: 0.85rem; font-weight: 600;
          padding: 9px 16px; border-radius: 999px; box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
        }
        .dp-audit-trust-item svg { color: #10b981; flex-shrink: 0; }
        .dp-audit-form {
          background: #ffffff; border-radius: 24px; padding: 44px;
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08); border: 1px solid #eef0f3;
          display: flex; flex-direction: column; gap: 22px;
        }
        .dp-audit-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .dp-audit-field { display: flex; flex-direction: column; gap: 7px; }
        .dp-audit-field label { font-size: 0.82rem; font-weight: 600; color: #374151; }
        .dp-audit-field input, .dp-audit-field textarea {
          padding: 14px 16px; border: 1.5px solid #e5e7eb; border-radius: 12px;
          font-size: 0.97rem; font-family: inherit; color: #111827; background: #fcfcfd;
          outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .dp-audit-field input:focus, .dp-audit-field textarea:focus {
          border-color: #10b981; background: #ffffff; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
        }
        .dp-audit-field textarea { resize: vertical; min-height: 120px; }
        .dp-audit-error {
          background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c;
          font-size: 0.88rem; font-weight: 500; padding: 12px 16px; border-radius: 10px;
        }
        .dp-audit-submit {
          background: linear-gradient(135deg, #10b981, #059669); color: #ffffff;
          font-size: 1.02rem; font-weight: 700; padding: 16px; border: none; border-radius: 12px;
          cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }
        .dp-audit-submit:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(16, 185, 129, 0.4); }
        .dp-audit-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .dp-audit-note { text-align: center; font-size: 0.82rem; color: #9ca3af; }
        .dp-audit-overlay {
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6);
          display: flex; align-items: center; justify-content: center; padding: 24px;
          z-index: 1000; animation: dp-fade-in 0.25s ease;
        }
        .dp-audit-popup {
          background: #ffffff; border-radius: 22px; padding: 44px 36px; max-width: 420px; width: 100%;
          text-align: center; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25); animation: dp-pop-in 0.3s ease;
        }
        .dp-audit-popup-icon { color: #10b981; display: flex; justify-content: center; margin-bottom: 20px; }
        .dp-audit-popup h3 { font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0 0 12px; }
        .dp-audit-popup p { color: #6b7280; font-size: 0.97rem; line-height: 1.6; margin: 0 0 28px; }
        .dp-audit-popup button {
          background: #0f172a; color: #ffffff; border: none; padding: 13px 32px;
          border-radius: 10px; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s ease;
        }
        .dp-audit-popup button:hover { background: #1e293b; }
        @keyframes dp-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dp-pop-in { from { opacity: 0; transform: scale(0.92) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @media (max-width: 640px) {
          .dp-audit { padding: 80px 18px; }
          .dp-audit-form { padding: 28px 22px; }
          .dp-audit-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dp-audit-inner">
        <span className="dp-audit-tag">✦ Free Data Audit</span>
        <h2 className="dp-audit-title">Get Your Free Data Audit</h2>
        <p className="dp-audit-subtitle">
          Tell us a little about your business and we'll show you exactly where you're losing time, money or visibility in your data.
        </p>

        <div className="dp-audit-trust">
          {trustIndicators.map((item, i) => (
            <div className="dp-audit-trust-item" key={i}>
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* method="post" is a safety fallback — e.preventDefault() is the primary guard */}
        <form className="dp-audit-form" onSubmit={handleSubmit} method="post" noValidate>
          <div className="dp-audit-row">
            <div className="dp-audit-field">
              <label htmlFor="name">Your Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="dp-audit-field">
              <label htmlFor="company">Company Name</label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Acme Inc."
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="dp-audit-row">
            <div className="dp-audit-field">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="dp-audit-field">
              <label htmlFor="whatsapp">WhatsApp Number</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="text"
                placeholder="+91 XXXXX XXXXX"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="dp-audit-field">
            <label htmlFor="message">Tell us about your business</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="What data challenges are you facing?"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {status === "error" && (
            <div className="dp-audit-error">{errorMsg}</div>
          )}

          <button
            type="submit"
            className="dp-audit-submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Get Free Audit →"}
          </button>

          <p className="dp-audit-note">
            We respect your privacy. Your information is never shared with third parties.
          </p>
        </form>
      </div>

      {status === "success" && (
        <div className="dp-audit-overlay" onClick={closePopup}>
          <div className="dp-audit-popup" onClick={(e) => e.stopPropagation()}>
            <div className="dp-audit-popup-icon">
              <CheckCircleIcon />
            </div>
            <h3>Thank You!</h3>
            <p>Your audit request has been received. We'll be in touch within 24 hours.</p>
            <button onClick={closePopup}>Done</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuditForm;