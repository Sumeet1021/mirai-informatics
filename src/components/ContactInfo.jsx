const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.84.5 3.62 1.46 5.18L2 22l5.06-1.56a9.9 9.9 0 0 0 4.98 1.33h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.78 14.04c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.83-.12-.42-.13-.95-.31-1.65-.6-2.9-1.25-4.78-4.16-4.93-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.13 1.01-2.42.27-.29.59-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.18-.15.3-.3.46-.15.16-.31.36-.45.49-.15.13-.3.27-.13.55.17.27.78 1.28 1.67 2.07 1.15 1.03 2.12 1.35 2.4 1.5.29.15.46.13.63-.05.18-.18.74-.86.94-1.16.2-.29.4-.24.66-.14.27.1 1.7.8 1.99.95.29.14.49.21.56.33.07.13.07.7-.17 1.38Z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const contactDetails = [
  {
    label: "Email Us",
    value: "staranalytics03@gmail.com",
    href: "mailto:staranalytics03@gmail.com",
    icon: <MailIcon />,
  },
  {
    label: "WhatsApp",
    value: "+91 XXXXX XXXXX",
    href: "https://wa.me/91XXXXXXXXXX",
    icon: <WhatsAppIcon />,
  },
  {
    label: "Location",
    value: "Mumbai, India",
    href: null,
    icon: <LocationIcon />,
  },
];

const ContactInfo = () => {
  return (
    <section id="contact" className="dp-contact">
      <style>{`
        .dp-contact {
          position: relative;
          padding: 110px 24px;
          background: #ffffff;
          text-align: center;
          overflow: hidden;
        }
        .dp-contact::before,
        .dp-contact::after {
          content: "";
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.12;
          z-index: 0;
        }
        .dp-contact::before { background: #10b981; top: -120px; left: -100px; }
        .dp-contact::after { background: #2563eb; bottom: -140px; right: -100px; }
        .dp-contact-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; }
        .dp-contact-tag {
          display: inline-block;
          padding: 6px 18px;
          border-radius: 999px;
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .dp-contact-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .dp-contact-subtitle {
          color: #6b7280;
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 580px;
          margin: 0 auto 56px;
        }
        .dp-contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        .dp-contact-card {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 28px 26px;
          background: #ffffff;
          border: 1px solid #eef0f3;
          border-radius: 18px;
          text-align: left;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .dp-contact-card:hover {
          transform: translateY(-6px);
          border-color: #10b981;
          box-shadow: 0 18px 40px rgba(16, 185, 129, 0.18);
        }
        .dp-contact-icon {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          background: linear-gradient(135deg, #10b981, #2563eb);
        }
        .dp-contact-text { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .dp-contact-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .dp-contact-value {
          font-size: clamp(0.92rem, 2vw, 1.05rem);
          font-weight: 600;
          color: #111827;
          white-space: nowrap;
        }
        @media (max-width: 640px) {
          .dp-contact { padding: 80px 18px; }
          .dp-contact-card { padding: 22px 20px; }
        }
      `}</style>

      <div className="dp-contact-inner">
        <span className="dp-contact-tag">Get In Touch</span>
        <h2 className="dp-contact-title">Let's Discuss Your Data</h2>
        <p className="dp-contact-subtitle">
          Have a project in mind or just exploring what's possible? Reach out
          directly — we usually respond within a few hours.
        </p>

        <div className="dp-contact-grid">
          {contactDetails.map((item, index) => {
            const isLink = Boolean(item.href);
            const Tag = isLink ? "a" : "div";
            const linkProps = isLink
              ? {
                  href: item.href,
                  ...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {}),
                }
              : {};

            return (
              <Tag key={index} className="dp-contact-card" {...linkProps}>
                <div className="dp-contact-icon">{item.icon}</div>
                <div className="dp-contact-text">
                  <span className="dp-contact-label">{item.label}</span>
                  <span className="dp-contact-value">{item.value}</span>
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;