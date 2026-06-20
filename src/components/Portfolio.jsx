const ChartIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M7 16v-5" />
    <path d="M12 16V8" />
    <path d="M17 16v-3" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const dashboards = [
  { title: "E-commerce Dashboard", desc: "Revenue, orders, products and customer insights." },
  { title: "Marketing Dashboard", desc: "Campaign performance and ROI tracking." },
  { title: "Inventory Dashboard", desc: "Stock levels and inventory forecasting." },
  { title: "Executive Dashboard", desc: "Business KPIs in one place." },
  { title: "Sales Dashboard", desc: "Track revenue growth and sales trends." },
  { title: "Customer Analytics", desc: "Retention, churn and customer behavior." },
];

const Portfolio = () => {
  const scrollToAudit = () => {
    document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="dp-portfolio">
      <style>{`
        .dp-portfolio { padding: 110px 24px; background: #f9fafb; }
        .dp-portfolio-inner { max-width: 1200px; margin: 0 auto; }
        .dp-portfolio-tag {
          display: block; text-align: center; font-weight: 600; font-size: 0.8rem;
          letter-spacing: 0.06em; text-transform: uppercase; color: #059669; margin-bottom: 14px;
        }
        .dp-portfolio-title {
          text-align: center; font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800;
          color: #0f172a; margin: 0 0 16px; letter-spacing: -0.02em;
        }
        .dp-portfolio-subtitle {
          text-align: center; color: #6b7280; font-size: 1.02rem;
          max-width: 560px; margin: 0 auto 60px; line-height: 1.7;
        }
        .dp-portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .dp-portfolio-card {
          background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #eef0f3;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .dp-portfolio-card:hover { transform: translateY(-8px); box-shadow: 0 24px 50px rgba(16, 185, 129, 0.18); }
        .dp-portfolio-preview {
          height: 180px; background: linear-gradient(135deg, #10b981, #2563eb);
          background-size: 200% 200%; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 10px; color: #ffffff;
          position: relative; overflow: hidden; transition: background-position 0.6s ease;
        }
        .dp-portfolio-card:hover .dp-portfolio-preview { background-position: 100% 100%; }
        .dp-portfolio-preview::before {
          content: ""; position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px);
          background-size: 16px 16px; opacity: 0.5;
        }
        .dp-portfolio-preview-label { font-size: 1.05rem; font-weight: 700; position: relative; z-index: 1; }
        .dp-portfolio-preview svg { position: relative; z-index: 1; }
        .dp-portfolio-body { padding: 26px; }
        .dp-portfolio-body h3 { font-size: 1.15rem; font-weight: 700; color: #0f172a; margin: 0 0 10px; }
        .dp-portfolio-body p { color: #6b7280; font-size: 0.94rem; line-height: 1.6; margin: 0; }
        .dp-portfolio-btn {
          margin-top: 22px; display: inline-flex; align-items: center; gap: 8px;
          background: #10b981; color: #ffffff; border: none; padding: 11px 22px; border-radius: 10px;
          font-weight: 600; font-size: 0.9rem; cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.25);
        }
        .dp-portfolio-btn:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(16, 185, 129, 0.35); }
        @media (max-width: 640px) { .dp-portfolio { padding: 80px 18px; } }
      `}</style>

      <div className="dp-portfolio-inner">
        <span className="dp-portfolio-tag">Our Work</span>
        <h2 className="dp-portfolio-title">Dashboard Portfolio</h2>
        <p className="dp-portfolio-subtitle">Explore sample dashboards designed to help businesses make smarter decisions.</p>

        <div className="dp-portfolio-grid">
          {dashboards.map((dashboard, index) => (
            <div key={index} className="dp-portfolio-card">
              <div className="dp-portfolio-preview">
                <ChartIcon />
                <span className="dp-portfolio-preview-label">Dashboard Preview</span>
              </div>
              <div className="dp-portfolio-body">
                <h3>{dashboard.title}</h3>
                <p>{dashboard.desc}</p>
                <button className="dp-portfolio-btn" onClick={scrollToAudit}>
                  View Details <ArrowIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;