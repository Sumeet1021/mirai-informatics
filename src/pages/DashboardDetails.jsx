import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDashboardById, getRelatedDashboards } from "../data/dashboardData";
import DashboardGallery from "../components/DashboardGallery";

// ─── DESIGN TOKENS ───────────────────────────────────────────────
const C = {
  green: "#10B981", greenLight: "#D1FAE5", greenDark: "#065F46",
  offWhite: "#FAFAFA", white: "#FFFFFF", dark: "#0F172A",
  secondary: "#475569", border: "#E2E8F0", navy: "#0A1628",
};

const PAGE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  .dd-page { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
  .dd-back-btn:hover { background: #f1f5f9 !important; }
  .dd-related-card:hover {
    box-shadow: 0 8px 32px rgba(16,185,129,0.15) !important;
    transform: translateY(-4px) !important;
  }
  .dd-kpi-card { transition: transform 0.2s; }
  .dd-kpi-card:hover { transform: translateY(-3px); }
  .dd-tool-badge:hover { background: #065F46 !important; color: #fff !important; }
  @keyframes dd-fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .dd-animate { animation: dd-fadeIn 0.5s ease both; }
  .dd-animate-delay-1 { animation-delay: 0.1s; }
  .dd-animate-delay-2 { animation-delay: 0.2s; }
  .dd-animate-delay-3 { animation-delay: 0.3s; }
  .dd-animate-delay-4 { animation-delay: 0.4s; }
  @media (max-width: 960px) {
    .dd-main-grid { grid-template-columns: 1fr !important; }
    .dd-hero-inner { padding: 80px 24px 48px !important; }
    .dd-kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .dd-related-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 600px) {
    .dd-kpi-grid { grid-template-columns: 1fr 1fr !important; }
    .dd-page-inner { padding: 32px 16px !important; }
    .dd-related-grid { grid-template-columns: 1fr !important; }
  }
`;

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
      textTransform: "uppercase", color: C.green, marginBottom: 10,
    }}>{children}</div>
  );
}

function KpiCard({ kpi, color }) {
  return (
    <div className="dd-kpi-card" style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderRadius: 14, padding: "18px 14px", textAlign: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      <div style={{ fontSize: 22, marginBottom: 6 }}>{kpi.icon}</div>
      <div style={{ fontSize: 19, fontWeight: 800, color: color || C.green, marginBottom: 4 }}>
        {kpi.value}
      </div>
      <div style={{ fontSize: 11, color: C.secondary, fontWeight: 500 }}>{kpi.label}</div>
    </div>
  );
}

function InsightRow({ text }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
      <div style={{
        width: 22, height: 22, borderRadius: "50%", background: C.greenLight,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginTop: 2,
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6l2.5 2.5 4.5-5" stroke={C.green} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{ fontSize: 14, color: C.secondary, lineHeight: 1.65 }}>{text}</span>
    </div>
  );
}

function RelatedCard({ dash }) {
  const navigate = useNavigate();
  return (
    <div className="dd-related-card" onClick={() => { navigate(`/dashboard/${dash.id}`); window.scrollTo(0, 0); }}
      style={{
        background: C.white, border: `1px solid ${C.border}`,
        borderRadius: 16, overflow: "hidden", cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}>
      <div style={{
        height: 100,
        background: `linear-gradient(135deg, ${dash.color}20, ${dash.color}40)`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
      }}>
        {dash.icon}
      </div>
      <div style={{ padding: "16px 20px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: dash.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
          {dash.industry}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 10 }}>
          {dash.title}
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.green }}>View Case Study →</span>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────
export default function DashboardDetails() {
  const { dashboardId } = useParams();
  const navigate = useNavigate();
  const dash = getDashboardById(dashboardId);
  const related = dash ? getRelatedDashboards(dash.relatedIds) : [];

  useEffect(() => {
    if (!document.getElementById("dd-page-css")) {
      const el = document.createElement("style");
      el.id = "dd-page-css";
      el.textContent = PAGE_CSS;
      document.head.appendChild(el);
    }
    window.scrollTo(0, 0);
    if (dash) document.title = `${dash.title} | DataPulse Analytics`;
  }, [dashboardId, dash]);

  if (!dash) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Inter', sans-serif", gap: 16,
      }}>
        <div style={{ fontSize: 64 }}>🔍</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: C.dark }}>Dashboard not found</h1>
        <button onClick={() => navigate("/#portfolio")} style={{
          background: C.green, color: "#fff", border: "none",
          padding: "12px 24px", borderRadius: 10, fontWeight: 600,
          cursor: "pointer", fontSize: 15,
        }}>← Back to Portfolio</button>
      </div>
    );
  }

  return (
    <div className="dd-page" style={{ background: C.offWhite, minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div style={{
        background: `linear-gradient(135deg, ${dash.color}18 0%, ${dash.color}35 50%, ${C.offWhite} 100%)`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="dd-hero-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 48px 56px" }}>
          <Link to="/#portfolio" className="dd-back-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 14, fontWeight: 600, color: C.secondary,
            textDecoration: "none", padding: "8px 16px", borderRadius: 8,
            background: "rgba(255,255,255,0.75)", border: `1px solid ${C.border}`,
            marginBottom: 32, backdropFilter: "blur(8px)", transition: "background 0.2s",
          }}>← Back to Portfolio</Link>

          <div className="dd-animate" style={{ marginBottom: 12 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: `${dash.color}20`, color: dash.color,
              borderRadius: 100, padding: "4px 14px", fontSize: 12, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em",
            }}>
              {dash.icon} {dash.industry}
            </span>
          </div>

          <h1 className="dd-animate dd-animate-delay-1" style={{
            fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 800,
            color: C.dark, lineHeight: 1.15, marginBottom: 8, maxWidth: 700,
          }}>{dash.title}</h1>

          <p className="dd-animate dd-animate-delay-2" style={{
            fontSize: 18, color: C.secondary, marginBottom: 24, fontWeight: 500,
          }}>{dash.subtitle}</p>

          <div className="dd-animate dd-animate-delay-3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { icon: "🛠", text: dash.tool },
              { icon: "📁", text: dash.projectType },
              { icon: "⚡", text: `Delivered in ${dash.duration}` },
              { icon: "🖼", text: `${dash.images.length} Dashboard Page${dash.images.length > 1 ? "s" : ""}` },
            ].map(({ icon, text }) => (
              <span key={text} style={{
                background: C.white, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600,
                color: C.dark, display: "flex", alignItems: "center", gap: 6,
              }}>{icon} {text}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="dd-page-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 48px" }}>
        <div className="dd-main-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 360px", gap: 40, alignItems: "start",
        }}>

          {/* ── LEFT ── */}
          <div>
            {/* Gallery */}
            <div className="dd-animate" style={{
              background: C.white, borderRadius: 20, padding: 24,
              border: `1px solid ${C.border}`, marginBottom: 24,
              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}>
              <SectionLabel>Dashboard Preview — Real Screenshots</SectionLabel>
              <DashboardGallery images={dash.images} color={dash.color} />
            </div>

            {/* Business Insights */}
            <div className="dd-animate dd-animate-delay-1" style={{
              background: C.white, borderRadius: 20, padding: 28,
              border: `1px solid ${C.border}`, marginBottom: 24,
              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}>
              <SectionLabel>Business Insights</SectionLabel>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 20 }}>
                What this dashboard reveals
              </h2>
              {dash.insights.map((ins) => <InsightRow key={ins} text={ins} />)}
            </div>

            {/* Tools Used */}
            <div className="dd-animate dd-animate-delay-2" style={{
              background: C.white, borderRadius: 20, padding: 28,
              border: `1px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}>
              <SectionLabel>Tools & Technologies</SectionLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
                {dash.tools.map((tool) => (
                  <span key={tool} className="dd-tool-badge" style={{
                    background: C.greenLight, color: C.greenDark,
                    border: `1px solid ${C.green}30`,
                    borderRadius: 8, padding: "8px 16px",
                    fontSize: 13, fontWeight: 600, cursor: "default",
                    transition: "background 0.2s, color 0.2s",
                  }}>{tool}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Project Overview */}
            <div className="dd-animate" style={{
              background: C.white, borderRadius: 20, padding: 24,
              border: `1px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}>
              <SectionLabel>Project Overview</SectionLabel>
              <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.7, margin: 0 }}>
                {dash.objective}
              </p>
            </div>

            {/* KPIs */}
            <div className="dd-animate dd-animate-delay-1" style={{
              background: C.white, borderRadius: 20, padding: 24,
              border: `1px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}>
              <SectionLabel>Key KPIs Tracked</SectionLabel>
              <div className="dd-kpi-grid" style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 4,
              }}>
                {dash.kpis.map((kpi) => (
                  <KpiCard key={kpi.label} kpi={kpi} color={dash.color} />
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="dd-animate dd-animate-delay-2" style={{
              background: C.white, borderRadius: 20, padding: 24,
              border: `1px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}>
              <SectionLabel>Project Details</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Industry", value: dash.industry },
                  { label: "Project Type", value: dash.projectType },
                  { label: "Primary Tool", value: dash.tool },
                  { label: "Delivery Time", value: dash.duration },
                  { label: "Dashboard Pages", value: `${dash.images.length} page${dash.images.length > 1 ? "s" : ""}` },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", paddingBottom: 12,
                    borderBottom: `1px solid ${C.border}`,
                  }}>
                    <span style={{ fontSize: 13, color: C.secondary, fontWeight: 500 }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="dd-animate dd-animate-delay-3" style={{
              background: `linear-gradient(135deg, ${C.dark}, #1e293b)`,
              borderRadius: 20, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
            }}>
              <div style={{ fontSize: 20, marginBottom: 10 }}>💼</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                Want a similar dashboard?
              </h3>
              <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.6, marginBottom: 20 }}>
                We build custom Power BI dashboards tailored to your business. Free consultation included.
              </p>
              <a href="/#audit" style={{
                display: "block", textAlign: "center",
                background: C.green, color: "#fff", borderRadius: 10, padding: "12px 20px",
                fontSize: 14, fontWeight: 700, textDecoration: "none", marginBottom: 10,
              }}>Get Free Audit →</a>
              <a
                href={`https://wa.me/917700032709?text=Hi%2C%20I%20saw%20your%20${encodeURIComponent(dash.title)}%20and%20I%27m%20interested%20in%20a%20similar%20dashboard.`}
                target="_blank" rel="noreferrer"
                style={{
                  display: "block", textAlign: "center",
                  background: "#25D36615", color: "#25D366",
                  border: "1px solid #25D36640",
                  borderRadius: 10, padding: "12px 20px",
                  fontSize: 14, fontWeight: 600, textDecoration: "none",
                }}>💬 WhatsApp Us</a>
            </div>
          </div>
        </div>

        {/* ── RELATED ── */}
        {related.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <SectionLabel>Related Work</SectionLabel>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: C.dark, marginBottom: 28 }}>
              More Case Studies
            </h2>
            <div className="dd-related-grid" style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(related.length, 3)}, 1fr)`,
              gap: 20,
            }}>
              {related.map((r) => <RelatedCard key={r.id} dash={r} />)}
            </div>
          </div>
        )}

        {/* ── ALL DASHBOARDS ── */}
        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 48, borderTop: `1px solid ${C.border}` }}>
          <Link to="/#portfolio" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: C.white, border: `2px solid ${C.border}`,
            color: C.dark, textDecoration: "none",
            borderRadius: 12, padding: "14px 28px",
            fontSize: 15, fontWeight: 600,
          }}>← View All Dashboards</Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        background: C.navy, padding: "24px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, marginTop: 48,
      }}>
        <span style={{ fontSize: 14, color: "#64748B" }}>© 2024 DataPulse Analytics. All rights reserved.</span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="/#contact" style={{ fontSize: 14, color: "#94A3B8", textDecoration: "none" }}>Contact</a>
          <a href="/#portfolio" style={{ fontSize: 14, color: "#94A3B8", textDecoration: "none" }}>Portfolio</a>
          <a href="/#audit" style={{ fontSize: 14, color: C.green, textDecoration: "none", fontWeight: 600 }}>Free Audit</a>
        </div>
      </div>
    </div>
  );
}