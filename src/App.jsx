import { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import DashboardDetails from "./pages/DashboardDetails";

// ── FOUNDER IMAGES ────────────────────────────────────────────────
import sumeetImg from "./images/sumeet.png.png";
import shivamImg from "./images/shivam.png.png";
import kartikImg from "./images/kartik.png.png";
import logoImg from "./images/logo.png"; // Premium Mirai Informatics Logo

// ─── GLOBAL PRODUCTION CSS ───────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { width: 100%; overflow-x: hidden; scroll-behavior: smooth; font-size: 16px; }
  body {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    background-color: #FFFFFF;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  #root { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 !important; }
  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; }
  ::selection { background: rgba(16, 185, 129, 0.2); color: #065F46; }

  /* ── BRANDING RESPONSIVENESS AND VISUAL TRANSITIONS ── */
  .brand-logo-container {
    display: flex;
    align-items: center;
    gap: 16px;
    text-decoration: none;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .brand-logo-image {
    width: 80px;
    height: auto;
    object-fit: contain;
    transition: all 0.4s ease;
  }
  .brand-title-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.1;
  }
  .brand-company-name {
    font-size: 32px;
    font-weight: 800;
    color: #0F172A;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: all 0.4s ease;
  }
  .brand-tagline {
    font-size: 13px;
    font-weight: 600;
    color: #059669;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-top: 2px;
  }
  .brand-logo-container:hover .brand-logo-image {
    transform: scale(1.05);
    filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.3));
  }
  .brand-logo-container:hover .brand-company-name {
    text-shadow: 0 0 1px rgba(15, 23, 42, 0.2);
  }

  /* ── HERO BRAND BADGE ── */
  .hero-brand-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(16, 185, 129, 0.2);
    padding: 10px 22px;
    border-radius: 100px;
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.06);
    backdrop-filter: blur(8px);
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
  }
  .hero-badge-glow {
    position: absolute;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%);
    top: -10px;
    left: -10px;
    animation: spinSlow 8s linear infinite;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  @media (max-width: 1024px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center; }
    .hero-left-content { display: flex; flex-direction: column; align-items: center; }
    .hero-left-content p { margin-left: auto; margin-right: auto; }
    .hero-cta-wrapper { justify-content: center; }
    .hero-trust-badges { justify-content: center; }
  }
  @media (max-width: 768px) {
    .two-col { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .nav-links { display: none !important; }
    .contact-grid { grid-template-columns: 1fr 1fr !important; }
    .expertise-stats-grid { grid-template-columns: 1fr 1fr !important; }
    .stats-grid { grid-template-columns: 1fr 1fr !important; }
    .tools-grid { grid-template-columns: repeat(3, 1fr) !important; }
    
    .brand-logo-image { width: 55px; }
    .brand-company-name { font-size: 22px; }
    .brand-logo-container { gap: 10px; }
  }
  @media (max-width: 480px) {
    .footer-grid { grid-template-columns: 1fr !important; }
    .expertise-stats-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .stats-grid { grid-template-columns: 1fr 1fr !important; }
    .tools-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  /* ── ANIMATIONS ── */
  @keyframes shine {
    100% { left: 125%; }
  }
  @keyframes borderGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
    50% { box-shadow: 0 0 0 16px rgba(37, 211, 102, 0); }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes floatBlob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(20px, -20px) scale(1.05); }
    66% { transform: translate(-15px, 10px) scale(0.98); }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .premium-shine {
    position: relative; overflow: hidden;
  }
  .premium-shine::after {
    content: ''; position: absolute; top: 0; left: -75%; width: 50%; height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%);
    transform: skewX(-25deg); transition: 0.75s;
  }
  .premium-shine:hover::after {
    animation: shine 0.75s forwards;
  }

  .animated-gradient-border {
    position: relative;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 32px;
  }
  .animated-gradient-border::before {
    content: ''; position: absolute; inset: -1.5px; filter: blur(0px);
    background: linear-gradient(90deg, #10B981, #059669, #3B82F6, #10B981);
    background-size: 300% 300%; border-radius: 33px; z-index: -1;
    animation: borderGradient 8s linear infinite;
  }

  .gradient-text {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .gradient-text-animated {
    background: linear-gradient(270deg, #10B981, #059669, #3B82F6, #10B981);
    background-size: 400% 400%;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: gradientShift 6s ease infinite;
  }

  /* ── FLOATING ACTION TOOLTIP ── */
  .fab-container { position: relative; }
  .fab-tooltip {
    position: absolute; right: 76px; top: 50%; transform: translateY(-50%) translateX(10px);
    background: #0F172A; color: #FFFFFF; padding: 8px 14px; border-radius: 8px;
    font-size: 13px; font-weight: 600; white-space: nowrap; opacity: 0; pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  .fab-tooltip::after {
    content: ''; position: absolute; top: 50%; right: -4px; transform: translateY(-50%) rotate(45deg);
    width: 8px; height: 8px; background: #0F172A;
  }
  .fab-container:hover .fab-tooltip { opacity: 1; transform: translateY(-50%) translateX(0); }

  /* ── NAV LINK HOVER ── */
  .nav-link { position: relative; }
  .nav-link::after {
    content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1.5px;
    background: #10B981; transition: width 0.25s ease;
  }
  .nav-link:hover::after { width: 100%; }
  .nav-link:hover { color: #0F172A !important; }

  /* ── CARD HOVER ── */
  .dp-card-hover {
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease !important;
  }
  .dp-card-hover:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 24px 48px rgba(16,185,129,0.10) !important;
  }

  /* ── INPUT FOCUS ── */
  .dp-input:focus {
    border-color: #10B981 !important;
    box-shadow: 0 0 0 3px rgba(16,185,129,0.12) !important;
    outline: none !important;
  }

  /* ── SECTION TRANSITION ── */
  section { position: relative; }

  /* ── TOOL CARD ── */
  .tool-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }
  .tool-card:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 12px 28px rgba(16,185,129,0.15);
    border-color: rgba(16,185,129,0.4) !important;
  }

  /* ── STAT NUMBER ── */
  .stat-number {
    animation: numberPulse 3s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

// ─── TOKENS ─────────────────────────────────────────────────────
const C = {
  green: "#10B981",
  greenLight: "#D1FAE5",
  greenDark: "#065F46",
  greenMid: "#059669",
  blue: "#F0F7FF",
  offWhite: "#F8FAFC",
  white: "#FFFFFF",
  dark: "#0F172A",
  dark2: "#1E293B",
  secondary: "#475569",
  tertiary: "#94A3B8",
  border: "#E2E8F0",
  navy: "#060F1E",
};

const s = {
  container: { maxWidth: 1280, margin: "0 auto", padding: "0 40px" },
  containerNarrow: { maxWidth: 960, margin: "0 auto", padding: "0 40px" },
  section: { padding: "100px 0" },
  sectionSm: { padding: "80px 0" },
  eyebrow: {
    display: "inline-flex", alignItems: "center", gap: 6,
    fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase", color: C.green, marginBottom: 20,
    background: C.greenLight, borderRadius: 100, padding: "6px 16px",
  },
  h2: {
    fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800,
    color: C.dark, lineHeight: 1.15, marginBottom: 20,
    letterSpacing: "-0.02em",
  },
  lead: { fontSize: 18, color: C.secondary, lineHeight: 1.8, marginBottom: 40 },
  card: {
    background: C.white, border: `1px solid ${C.border}`, borderRadius: 24, padding: "40px 32px",
    boxShadow: "0 4px 20px rgba(15,23,42,0.02)", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
  },
  btnPrimary: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: C.green, color: C.white, border: "none", borderRadius: 14,
    padding: "16px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer",
    boxShadow: "0 4px 14px rgba(16,185,129,0.25)", transition: "all 0.3s ease"
  },
  btnOutline: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "transparent", color: C.dark, border: `1.5px solid ${C.border}`,
    borderRadius: 14, padding: "16px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer",
    transition: "all 0.3s ease"
  },
};

// ─── WHATSAPP ────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "917700032709";
const AUTO_MESSAGE = `Hello Mirai Informatics Team,

I am interested in a Free Data Analytics Audit for my business.

Business Name: 
Industry: 
Current Challenges: 

I would like to know how Mirai Informatics can help improve my reporting, dashboards, and business insights.

Looking forward to hearing from you.

Thanks.`;

const openWhatsAppSystem = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(AUTO_MESSAGE)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

// ─── SCROLL REVEAL FADE IN UP WRAPPER ─────────────────────────────
function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── ANIMATED COUNT UP ───────────────────────────────────────────
function CountUp({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── FLOATING BLOB ───────────────────────────────────────────────
function FloatingBlob({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(64px)",
        pointerEvents: "none",
        animation: "floatBlob 16s ease-in-out infinite",
        zIndex: 0,
        ...style,
      }}
    />
  );
}

// ─── PREMIUM EXPERTISE CARD WITH GLOW EFFECTS ─────────────────────
function AnalyticsExpertiseCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.015 }}
      style={{ position: "relative", width: "100%", maxWidth: 580, margin: "0 auto" }}
    >
      {/* Decorative Glow Elements */}
      <div style={{
        position: "absolute", top: "-40px", left: "-40px", width: 180, height: 180,
        background: "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0) 70%)",
        borderRadius: "50%", filter: "blur(12px)", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "-50px", right: "-30px", width: 200, height: 200,
        background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 70%)",
        borderRadius: "50%", filter: "blur(20px)", pointerEvents: "none"
      }} />

      

      <div className="animated-gradient-border" style={{ boxShadow: "0 40px 80px rgba(15, 23, 42, 0.15)" }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.90)",
          backdropFilter: "blur(28px)",
          borderRadius: 32,
          padding: "44px 40px",
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, borderBottom: "1px solid rgba(226, 232, 240, 0.8)", paddingBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: "-0.02em" }}>MIRAI INFORMATICS EXPERTISE</h3>
              <p style={{ fontSize: 12, color: C.green, fontWeight: 700, marginTop: 4, letterSpacing: "0.03em", textTransform: "uppercase" }}>Transforming Business Data Into Strategic Growth</p>
            </div>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: C.green, boxShadow: "0 0 16px #10B981", animation: "pulseGlow 2.5s ease-in-out infinite" }} />
          </div>

          <div className="expertise-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}>
            {[
              { value: 500, suffix: "+", label: "Datasets Analyzed" },
              { value: 50, suffix: "M+", label: "Records Processed" },
              { value: 100, suffix: "+", label: "Dashboards Built" },
              { value: 20, suffix: "+", label: "Industries Served" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, boxShadow: "0 12px 28px rgba(16,185,129,0.14)", backgroundColor: "rgba(255,255,255,1)" }}
                style={{ background: "rgba(248, 250, 252, 0.7)", border: "1px solid rgba(222, 226, 230, 0.6)", borderRadius: 16, padding: "20px 22px", transition: "all 0.3s ease" }}
              >
                <div className="stat-number" style={{ fontSize: 30, fontWeight: 900, color: C.dark, letterSpacing: "-0.03em" }}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.secondary, marginTop: 6 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 800, color: C.dark, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>Core Tech Deployments</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Excel & Advanced Excel", "SQL Databases", "Power BI", "Python", "Tableau", "AI Analytics"].map((tech, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.secondary, fontWeight: 500 }}>
                    <span style={{ color: C.green, fontWeight: 700 }}>✓</span> {tech}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 800, color: C.dark, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>Consulting Capabilities</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Data Cleaning", "Dashboard Development", "KPI Tracking", "Sales Analytics", "Business Intelligence", "Automated Reporting"].map((srv, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.secondary, fontWeight: 500 }}>
                    <span style={{ color: C.green, fontWeight: 700 }}>✓</span> {srv}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SVG ICONS ───────────────────────────────────────────────────
const PREMIUM_GMAIL_ICON = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="#F2F2F2"/>
    <path d="M22 6V18C22 19.1 21.1 20 20 20H18V8L12 12L6 8V20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H20C21.1 4 22 4.9 22 6Z" fill="#EA4335"/>
    <path d="M18 4H20C21.1 4 22 4.9 22 6V7L12 13.5L2 7V6C2 4.9 2.9 4 4 4H6" fill="#FBBC05"/>
    <path d="M2 6V7L12 13.5L22 7V6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6Z" fill="#4285F4"/>
    <path d="M2 7.5V18C2 19.1 2.9 20 4 20H6V9.5L12 13.7L18 9.5V20H20C21.1 20 22 19.1 22 18V7.5L12 14.5L2 7.5Z" fill="#34A853"/>
  </svg>
);

const PREMIUM_WHATSAPP_ICON = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const LINKEDIN_ICON = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LOCATION_ICON = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ─── NAVBAR WITH ENLARGED BRANDING ────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Services", "Portfolio", "Process", "Team", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
      borderBottom: scrolled ? `1px solid rgba(226, 232, 240, 0.6)` : "none",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      padding: scrolled ? "14px 0" : "24px 0",
    }}>
      <div style={{ ...s.container, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" className="brand-logo-container">
          <img 
            src={logoImg} 
            alt="Mirai Informatics Logo" 
            className="brand-logo-image"
          />
          <div className="brand-title-container">
            <span className="brand-company-name">
              Mirai<br />Informatics
            </span>
            <span className="brand-tagline">Data & AI Consulting</span>
          </div>
        </a>
        <div className="nav-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link"
              style={{ fontSize: 14, color: C.secondary, textDecoration: "none", fontWeight: 600, letterSpacing: "-0.01em" }}>
              {l}
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(16, 185, 129, 0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={openWhatsAppSystem}
            className="premium-shine"
            style={{ ...s.btnPrimary, padding: "12px 26px", fontSize: 14, borderRadius: 11 }}
          >
            Free Audit
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO WITH HIGHER BRAND PRESENCE ─────────────────────────────
function Hero() {
  return (
    <section style={{
      background: `linear-gradient(160deg, #F0F7FF 0%, #FAFAFA 55%, #ECFDF5 100%)`,
      paddingTop: 220, paddingBottom: 120, overflow: "hidden", position: "relative",
    }}>
      <FloatingBlob style={{ top: "10%", left: "5%", width: 450, height: 450, background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)" }} />
      <FloatingBlob style={{ top: "30%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)", animationDelay: "-6s" }} />

      <div className="hero-grid" style={{ ...s.container, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center", position: "relative", zIndex: 1 }}>
        <motion.div
          className="hero-left-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* New Premium Institutional Badge */}
          <div style={{ marginBottom: 8 }}>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="hero-brand-badge"
            >
              <div className="hero-badge-glow" />
              <img src={logoImg} alt="Mirai Informatics" style={{ width: 22, height: "auto", objectFit: "contain" }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: C.dark, letterSpacing: "0.08em" }}>
                MIRAI INFORMATICS
              </span>
            </motion.div>
          </div>

          <h1 style={{
            fontSize: "clamp(38px, 5.5vw, 60px)", fontWeight: 900, color: C.dark,
            lineHeight: 1.1, marginBottom: 28, letterSpacing: "-0.035em",
          }}>
            Turn Business Data Into{" "}
            <span className="gradient-text-animated">Measurable Growth</span>
          </h1>
          <p style={{ ...s.lead, maxWidth: 540 }}>
            We help enterprise networks, e-commerce systems, and expanding brands optimize intelligence loops via customized system visibility architectures.
          </p>
          <div className="hero-cta-wrapper" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={openWhatsAppSystem}
              className="premium-shine"
              style={s.btnPrimary}
            >
              Get Free Audit
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.04, backgroundColor: "rgba(15, 23, 42, 0.04)", borderColor: C.dark }}
              whileTap={{ scale: 0.97 }}
              href="#portfolio"
              style={s.btnOutline}
            >
              View Portfolio
            </motion.a>
          </div>
          <div className="hero-trust-badges" style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            ={["Power BI Certified", "Python & SQL Experts", "7–14 Day Delivery"].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.secondary, fontWeight: 500 }}
              >
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {t}
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <AnalyticsExpertiseCard />
        </motion.div>
      </div>
    </section>
  );
}

// ─── WHY US ──────────────────────────────────────────────────────
function WhyUs() {
  const items = [
    { icon: "💰", title: "Affordable Solutions", desc: "Premium analytics at startup-friendly prices. No enterprise bloat, just pure value." },
    { icon: "🎨", title: "Custom Dashboards", desc: "Every dashboard built to your exact metrics — not templated, not generic." },
    { icon: "⚡", title: "Fast Delivery", desc: "Most projects delivered within 7–14 days so you can act on insights faster." },
    { icon: "📈", title: "Growth Focused", desc: "We don't just show data — we surface the insights that drive real revenue." },
    { icon: "🎯", title: "Actionable Insights", desc: "Clear recommendations with every deliverable, not just pretty charts." },
    { icon: "🤝", title: "Free Consultation", desc: "Start with a no-cost discovery call. Zero pressure, maximum value." },
  ];

  return (
    <section style={{ ...s.section, background: C.offWhite, position: "relative", overflow: "hidden" }}>
      <FloatingBlob style={{ top: "20%", right: "-5%", width: 350, height: 350, background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)" }} />

      <div style={s.container}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <FadeUp>
            <span style={s.eyebrow}>✦ Why Mirai Informatics</span>
            <h2 style={s.h2}>Built for businesses that can't afford to guess</h2>
            <p style={{ ...s.lead, marginBottom: 0 }}>We combine technical rigor with business understanding to deliver analytics that actually move the needle.</p>
          </FadeUp>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {items.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(16,185,129,0.12)", borderColor: "rgba(16,185,129,0.3)" }}
                style={s.card}
              >
                <div style={{
                  width: 54, height: 54, background: C.greenLight, borderRadius: 16,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 22,
                }}>{item.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 12, letterSpacing: "-0.02em" }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STATS ───────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { val: "15+", label: "Service Offerings", sub: "From dashboards to automation" },
    { val: "5", label: "Core Tools Mastered", sub: "Power BI, Python, SQL & more" },
    { val: "7–14", label: "Day Delivery", sub: "Fast turnaround, no delays" },
    { val: "100%", label: "Custom Built", sub: "Nothing off-the-shelf" },
  ];
  return (
    <section style={{ ...s.sectionSm, background: "#111827", position: "relative", overflow: "hidden" }}>
      <FloatingBlob style={{ top: "0%", left: "20%", width: 400, height: 250, background: "radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 70%)" }} />
      <div style={s.container}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
          {stats.map((st, i) => (
            <FadeUp key={st.label} delay={i * 0.06}>
              <div style={{ textAlign: "center", position: "relative" }}>
                {i < stats.length - 1 && (
                  <div style={{
                    position: "absolute", right: 0, top: "20%", height: "60%",
                    width: 1, background: "rgba(255,255,255,0.08)",
                  }} />
                )}
                <div className="stat-number" style={{ fontSize: 54, fontWeight: 900, color: C.green, lineHeight: 1, letterSpacing: "-0.04em" }}>{st.val}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginTop: 12, letterSpacing: "-0.02em" }}>{st.label}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>{st.sub}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CLIENT BENEFITS ─────────────────────────────────────────────
function ClientBenefits() {
  const benefits = [
    { icon: "⚡", title: "Faster Reporting", desc: "Cut reporting time from days to minutes with automated pipelines." },
    { icon: "🧭", title: "Better Decisions", desc: "Confidence-backed decisions driven by real data, not gut feelings." },
    { icon: "🔭", title: "Increased Visibility", desc: "Full-picture dashboards that show where your business truly stands." },
    { icon: "🚀", title: "Data-Driven Growth", desc: "Unlock hidden revenue by identifying patterns your team can't see." },
  ];
  return (
    <section style={{ ...s.section, background: C.white, position: "relative", overflow: "hidden" }}>
      <FloatingBlob style={{ bottom: "0%", left: "-5%", width: 380, height: 380, background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />
      <div style={s.container}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <FadeUp>
            <span style={s.eyebrow}>✦ What You Gain</span>
            <h2 style={{ ...s.h2, marginBottom: 0 }}>Real outcomes, not just reports</h2>
          </FadeUp>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {benefits.map((b, i) => (
            <FadeUp key={b.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(16,185,129,0.12)", borderColor: C.green }}
                style={{
                  background: `linear-gradient(135deg, ${C.greenLight}55, ${C.white})`,
                  border: `1px solid rgba(16,185,129,0.2)`,
                  borderRadius: 24, padding: "36px 30px",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div style={{ fontSize: 34, marginBottom: 16 }}>{b.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>✓ {b.title}</div>
                <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TOOLS SHOWCASE ──────────────────────────────────────────────
function ToolsShowcase() {
  const tools = [
    { name: "Excel", icon: "📊", color: "#217346", bg: "#E8F5EF" },
    { name: "SQL", icon: "🗃️", color: "#336791", bg: "#E8EEF7" },
    { name: "Power BI", icon: "📈", color: "#F2C811", bg: "#FFFBEA" },
    { name: "Python", icon: "🐍", color: "#3776AB", bg: "#EAF3FB" },
    { name: "Tableau", icon: "📉", color: "#E97627", bg: "#FDF0E6" },
    { name: "AI Analytics", icon: "🤖", color: "#7C3AED", bg: "#F3EEFF" },
  ];
  return (
    <section style={{ ...s.section, background: C.offWhite }}>
      <div style={s.container}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <FadeUp>
            <span style={s.eyebrow}>✦ Tools We Master</span>
            <h2 style={{ ...s.h2, marginBottom: 0 }}>The stack behind every insight</h2>
          </FadeUp>
        </div>
        <div className="tools-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 20 }}>
          {tools.map((tool, i) => (
            <FadeUp key={tool.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -8, scale: 1.05, boxShadow: `0 20px 40px ${tool.color}28`, borderColor: tool.color }}
                className="tool-card"
                style={{
                  background: tool.bg, border: `1.5px solid ${tool.color}15`,
                  borderRadius: 20, padding: "32px 18px", textAlign: "center",
                  cursor: "default", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                <div style={{ fontSize: 38, marginBottom: 14 }}>{tool.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: tool.color, letterSpacing: "-0.01em" }}>{tool.name}</div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEMS ────────────────────────────────────────────────────
function Problems() {
  const problems = [
    { icon: "🗂️", problem: "Scattered Data Matrix", pain: "Sales in transactional hubs, tracking variants down operational paths — zero unified configuration.", fix: "We integrate structural systems into single operational command platforms." },
    { icon: "📉", problem: "Absent Core Tracking", pain: "Strategic direction runs entirely on intuition rather than empirical tracking layers.", fix: "We build telemetry that records structural metrics critical to optimization loops." },
    { icon: "⏰", problem: "Manual Reporting Traps", pain: "Valuable engineering hours burnt building manual operational reviews week over week.", fix: "We structuralize reports to automatically route processing tasks away from manpower." },
    { icon: "💸", problem: "Untapped Pipeline Value", pain: "Hidden variations across product sets, performance clusters, and life cycles pass unseen.", fix: "Our visibility frameworks isolate structural parameters hiding core margin vectors." },
  ];
  return (
    <section style={s.section} id="services">
      <div style={s.container}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <FadeUp>
            <span style={s.eyebrow}>✦ Problems We Solve</span>
            <h2 style={s.h2}>Sound familiar?</h2>
            <p style={{ ...s.lead, marginBottom: 0 }}>Most business networks operate blind over massive data sets that hide core margins.</p>
          </FadeUp>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {problems.map((p, i) => (
            <FadeUp key={p.problem} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -8, borderTopColor: "#3B82F6", boxShadow: "0 24px 48px rgba(0,0,0,0.08)" }}
                style={{ ...s.card, borderTop: `4px solid ${C.green}`, transition: "all 0.35s ease" }}
              >
                <div style={{ fontSize: 34, marginBottom: 18 }}>{p.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 12, letterSpacing: "-0.02em" }}>{p.problem}</h3>
                <p style={{ fontSize: 14, color: C.secondary, marginBottom: 22, lineHeight: 1.7 }}>{p.pain}</p>
                <div style={{
                  background: C.greenLight, borderRadius: 14, padding: "14px 18px",
                  fontSize: 13, color: C.greenDark, fontWeight: 600, lineHeight: 1.5,
                  display: "flex", gap: 8, alignItems: "flex-start",
                }}>
                  <span style={{ flexShrink: 0 }}>✓</span>
                  <span>{p.fix}</span>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────
function Services() {
  const svcs = [
    { title: "Sales Analytics", desc: "Understand your sales funnel, best-performing products, and revenue trends at a glance.", icon: "📊" },
    { title: "Business Intelligence", desc: "Executive dashboards that give you a real-time pulse on your entire operation.", icon: "🧠" },
    { title: "Marketing Analytics", desc: "See exactly which channels drive revenue so you stop guessing with your ad budget.", icon: "🎯" },
    { title: "Customer Analytics", desc: "Segment your customers, identify high-value buyers, and reduce churn.", icon: "👥" },
    { title: "Reporting Automation", desc: "Automated weekly/monthly reports delivered straight to your inbox or Slack.", icon: "⚙️" },
    { title: "Power BI Dashboards", desc: "Beautiful, interactive Power BI dashboards your whole team can use without training.", icon: "📈" },
  ];
  return (
    <section style={{ ...s.section, background: C.blue }} id="services">
      <div style={s.container}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <FadeUp>
            <span style={s.eyebrow}>✦ What We Do</span>
            <h2 style={s.h2}>Analytics services for every business need</h2>
          </FadeUp>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {svcs.map((sv, i) => (
            <FadeUp key={sv.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 28px 56px rgba(16,185,129,0.14)", borderColor: "rgba(16,185,129,0.2)" }}
                style={s.card}
              >
                <div style={{
                  width: 54, height: 54, background: C.greenLight,
                  borderRadius: 16, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 24, marginBottom: 22,
                }}>{sv.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 12, letterSpacing: "-0.02em" }}>{sv.title}</h3>
                <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.7, margin: 0 }}>{sv.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO ───────────────────────────────────────────────────
import { DASHBOARDS } from "./data/dashboardData";

function Portfolio() {
  const navigate = useNavigate();
  return (
    <section style={s.section} id="portfolio">
      <div style={s.container}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <FadeUp>
            <span style={s.eyebrow}>✦ Portfolio</span>
            <h2 style={s.h2}>Real Power BI Dashboards</h2>
            <p style={{ ...s.lead, marginBottom: 0 }}>
              Completed dashboards across healthcare, finance, retail, SaaS and more — with real screenshots.
            </p>
          </FadeUp>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 26 }}>
          {DASHBOARDS.map((d, i) => (
            <FadeUp key={d.id} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -10, boxShadow: "0 36px 72px rgba(15,23,42,0.14)" }}
                onClick={() => navigate(`/dashboard/${d.id}`)}
                style={{ ...s.card, padding: 0, overflow: "hidden", cursor: "pointer" }}
              >
                <div style={{ height: 230, overflow: "hidden", position: "relative", background: `linear-gradient(135deg, ${d.color}18, ${d.color}38)` }}>
                  {d.images && d.images.length > 0 ? (
                    <img src={d.images[0]} alt={d.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.5s ease" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"}
                    />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 56 }}>{d.icon}</div>
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.45) 100%)" }} />
                  <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.95)", borderRadius: 8, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: d.color, letterSpacing: "0.02em", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>{d.industry}</div>
                  <div style={{ position: "absolute", bottom: 14, left: 14, background: "rgba(255,255,255,0.92)", borderRadius: 8, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: "#374151" }}>Power BI</div>
                  {d.images && d.images.length > 1 && (
                    <div style={{ position: "absolute", bottom: 14, right: 14, background: "rgba(0,0,0,0.65)", borderRadius: 8, padding: "4px 12px", fontSize: 11, fontWeight: 600, color: "#fff" }}>
                      {d.images.length} pages
                    </div>
                  )}
                </div>
                <div style={{ padding: "32px" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 14, letterSpacing: "-0.02em" }}>{d.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                    {d.kpis.slice(0, 3).map(k => (
                      <span key={k.label} style={{ background: C.greenLight, color: C.greenDark, borderRadius: 100, padding: "5px 14px", fontSize: 11, fontWeight: 600 }}>
                        {k.label}: {k.value}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="premium-shine"
                    style={{ ...s.btnPrimary, padding: "10px 22px", fontSize: 13, borderRadius: 10 }}
                    onClick={e => { e.stopPropagation(); navigate(`/dashboard/${d.id}`); }}>
                    View Dashboard →
                  </motion.button>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRIES ──────────────────────────────────────────────────
function Industries() {
  const inds = [
    { name: "E-commerce", icon: "🛒", desc: "Shopify, WooCommerce, and custom stores" },
    { name: "Retail", icon: "🏪", desc: "Inventory, footfall, and sales tracking" },
    { name: "D2C Brands", icon: "📦", desc: "End-to-end customer journey analytics" },
    { name: "Local Businesses", icon: "📍", desc: "Hyperlocal insights that matter" },
    { name: "Startups", icon: "🚀", desc: "Metrics to attract investors and grow fast" },
    { name: "Small Businesses", icon: "💼", desc: "Affordable analytics at any scale" },
  ];
  return (
    <section style={{ ...s.section, background: C.offWhite }}>
      <div style={s.container}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <FadeUp>
            <span style={s.eyebrow}>✦ Industries We Serve</span>
            <h2 style={s.h2}>Made for businesses like yours</h2>
          </FadeUp>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 22 }}>
          {inds.map((ind, i) => (
            <FadeUp key={ind.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.06)", borderColor: "rgba(0,0,0,0.05)" }}
                style={{ ...s.card, textAlign: "center", padding: "44px 24px" }}
              >
                <div style={{ fontSize: 42, marginBottom: 16 }}>{ind.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 10, letterSpacing: "-0.02em" }}>{ind.name}</div>
                <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.6 }}>{ind.desc}</div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ─────────────────────────────────────────────────────
function Process() {
  const steps = [
    { num: "01", title: "Understand Your Business", desc: "A deep-dive call to understand your goals, pain points, and what data you already have." },
    { num: "02", title: "Collect & Clean Data", desc: "We gather, audit, and clean your data — making it reliable before we do anything else." },
    { num: "03", title: "Analyze & Find Insights", desc: "Our analysts dig into the numbers to find patterns, opportunities, and red flags." },
    { num: "04", title: "Build Your Dashboard", desc: "A custom, interactive dashboard built in Power BI, Excel, or your preferred tool." },
    { num: "05", title: "Deliver & Train", desc: "We walk you through every insight and make sure your team can use the dashboard confidently." },
  ];
  return (
    <section style={s.section} id="process">
      <div style={{ ...s.containerNarrow }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <FadeUp>
            <span style={s.eyebrow}>✦ How It Works</span>
            <h2 style={s.h2}>From messy data to clear decisions in 5 steps</h2>
          </FadeUp>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.08}>
              <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 28, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    style={{
                      width: 54, height: 54, borderRadius: "50%",
                      background: i === 0 ? C.green : C.greenLight,
                      color: i === 0 ? C.white : C.greenDark,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 14, flexShrink: 0,
                      boxShadow: i === 0 ? "0 8px 24px rgba(16,185,129,0.35)" : "none",
                      letterSpacing: "-0.01em", cursor: "default",
                    }}>{step.num}</motion.div>
                  {i < steps.length - 1 && (
                    <div style={{ width: 1, height: 56, background: `linear-gradient(to bottom, ${C.green}44, ${C.border})`, margin: "6px 0" }} />
                  )}
                </div>
                <div style={{ paddingTop: 12, paddingBottom: i < steps.length - 1 ? 40 : 0 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 10, letterSpacing: "-0.02em" }}>{step.title}</h3>
                  <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOUNDERS ────────────────────────────────────────────────────
function Founders() {
  const founders = [
    {
      name: "Sumeet Gupta",
      role: "Co-Founder & Data Analyst",
      initials: "SG",
      color: "#10B981",
      photo: sumeetImg,
      linkedin: "https://www.linkedin.com/in/sumeet-gupta-577a66289",
      skills: ["Data Analytics", "Power BI", "Python", "SQL", "Data Visualization"],
    },
    {
      name: "Shivam Deshmukh",
      role: "Co-Founder & BI Engineer",
      initials: "SD",
      color: "#10B981",
      photo: shivamImg,
      linkedin: "https://www.linkedin.com/in/shivamlaxmikantdeshmukh01/",
      skills: ["Business Intelligence", "Power BI", "SQL", "Python", "KPI Design"],
    },
    {
      name: "Kartik Gore",
      role: "Co-Founder & Data Engineer",
      initials: "KG",
      color: "#10B981",
      photo: kartikImg,
      linkedin: "https://www.linkedin.com/in/kartikgore20/",
      skills: ["Data Engineering", "Automation", "Python", "SQL", "Reporting"],
    },
  ];

  return (
    <section style={{ ...s.section, background: C.offWhite }} id="team">
      <div style={s.container}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <FadeUp>
            <span style={s.eyebrow}>✦ Meet the Team</span>
            <h2 style={s.h2}>Built by analysts, for business owners</h2>
            <p style={{ ...s.lead, marginBottom: 0 }}>
              Three B.Tech AI & Data Science graduates from{" "}
              <strong style={{ color: C.dark }}>Vishwakarma University</strong>{" "}
              — passionate about making analytics accessible to every business.
            </p>
          </FadeUp>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {founders.map((f, i) => (
            <FadeUp key={f.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 28px 56px rgba(0,0,0,0.07)" }}
                style={{ ...s.card, padding: "44px 32px", transition: "all 0.35s ease" }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
                  <div style={{
                    width: 152, height: 152, borderRadius: "50%", marginBottom: 0,
                    background: `linear-gradient(135deg, ${f.color}44, ${f.color}22)`,
                    padding: 4, flexShrink: 0, position: "relative"
                  }}>
                    <img src={f.photo} alt={f.name}
                      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                      style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "3px solid white", boxShadow: "0 8px 32px rgba(16,185,129,0.22)" }}
                    />
                    <div style={{
                      width: "100%", height: "100%", borderRadius: "50%", background: `${f.color}22`, border: "3px solid white",
                      display: "none", alignItems: "center", justifyContent: "center",
                      fontSize: 36, fontWeight: 800, color: f.color, boxShadow: "0 8px 32px rgba(16,185,129,0.22)",
                    }}>{f.initials}</div>
                  </div>
                  <div style={{ textAlign: "center", marginTop: 22 }}>
                    <div style={{ fontSize: 19, fontWeight: 800, color: C.dark, letterSpacing: "-0.03em" }}>{f.name}</div>
                    <div style={{ fontSize: 13, color: C.secondary, marginTop: 5, fontWeight: 500 }}>{f.role}</div>
                  </div>
                </div>
                <div style={{
                  background: "#F0F4FF", borderRadius: 12, padding: "10px 16px",
                  marginBottom: 22, fontSize: 13, color: "#4B5563", textAlign: "center",
                  border: "1px solid #E0E7FF", fontWeight: 500,
                }}>
                  🎓 B.Tech AI & Data Science · Vishwakarma University
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26, justifyContent: "center" }}>
                  {f.skills.map(sk => (
                    <span key={sk} style={{ background: C.greenLight, color: C.greenDark, borderRadius: 100, padding: "5px 14px", fontSize: 12, fontWeight: 600 }}>{sk}</span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <a href={f.linkedin} target="_blank" rel="noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "#0A66C2",
                      padding: "10px 20px", border: "1.5px solid #0A66C222", borderRadius: 10, background: "#F0F6FF", letterSpacing: "-0.01em",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#0A66C2"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0A66C2"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#F0F6FF"; e.currentTarget.style.color = "#0A66C2"; e.currentTarget.style.borderColor = "#0A66C222"; }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AUDIT FORM ──────────────────────────────────────────────────
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "29903a1c-2e5d-43f4-badf-9a014bd36229";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialForm = { name: "", company: "", email: "", whatsapp: "", message: "" };

function AuditForm() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formDataRef = useRef(initialForm);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      formDataRef.current = next;
      return next;
    });
  }, []);

  const validate = (data) => {
    if (!data.name.trim()) return "Please enter your name.";
    if (!data.company.trim()) return "Please enter your company name.";
    if (!data.email.trim()) return "Please enter your email address.";
    if (!EMAIL_REGEX.test(data.email.trim())) return "Please enter a valid email address.";
    if (!data.whatsapp.trim()) return "Please enter your WhatsApp number.";
    if (!data.message.trim()) return "Please state your analytics requirements.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentData = formDataRef.current;
    const validationError = validate(currentData);
    if (validationError) { setErrorMsg(validationError); setStatus("error"); return; }
    setStatus("submitting"); setErrorMsg("");
    try {
      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      payload.append("name", currentData.name.trim());
      payload.append("company", currentData.company.trim());
      payload.append("email", currentData.email.trim());
      payload.append("whatsapp", currentData.whatsapp.trim());
      payload.append("message", currentData.message.trim());
      payload.append("subject", "New Free Data Audit Request — Mirai Informatics");
      payload.append("replyto", currentData.email.trim());
      const response = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: payload });
      let result = {};
      try { result = await response.json(); } catch (f) { }
      if (!response.ok || result.success === false) throw new Error(result?.message || `Submission failed with code ${response.status}`);
      formDataRef.current = initialForm;
      setFormData(initialForm);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "Data transmission interface error. Please verify endpoints.");
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", border: `1.5px solid ${C.border}`, borderRadius: 12,
    fontSize: 15, fontFamily: "inherit", color: C.dark, background: C.white, outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  return (
    <section style={{ ...s.section, background: C.offWhite }} id="audit">
      <div style={{ ...s.container, maxWidth: 760 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <FadeUp>
            <span style={s.eyebrow}>✦ Free Data Audit</span>
            <h2 style={s.h2}>Get a free analytics audit — no strings attached</h2>
            <p style={{ ...s.lead, marginBottom: 0 }}>We'll review your current data setup and send you a personalized report with opportunities for improvement.</p>
          </FadeUp>
        </div>
        {status === "success" ? (
          <FadeUp>
            <div style={{ background: C.white, borderRadius: 24, padding: 56, textAlign: "center", border: `2px solid ${C.green}`, boxShadow: "0 16px 48px rgba(16,185,129,0.12)" }}>
              <div style={{ fontSize: 56, marginBottom: 20 }}></div>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: C.dark, marginBottom: 10, letterSpacing: "-0.03em" }}>You're on the list!</h3>
              <p style={{ color: C.secondary, fontSize: 16, marginBottom: 24 }}>We'll review your submission and reach out within 24 hours.</p>
              <button onClick={() => setStatus("idle")} style={{ background: C.dark, color: C.white, border: "none", padding: "12px 28px", borderRadius: 12, fontWeight: 600, cursor: "pointer" }}>Dismiss</button>
            </div>
          </FadeUp>
        ) : (
          <FadeUp>
            <form onSubmit={handleSubmit} noValidate style={{ background: C.white, borderRadius: 24, padding: 48, border: `1px solid ${C.border}`, boxShadow: "0 8px 40px rgba(0,0,0,0.05)" }}>
              <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: C.dark, display: "block", marginBottom: 8 }}>Your Name *</label>
                  <input required name="name" value={formData.name} onChange={handleChange} placeholder="Rahul Sharma" className="dp-input" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: C.dark, display: "block", marginBottom: 8 }}>Company Name *</label>
                  <input required name="company" value={formData.company} onChange={handleChange} placeholder="My Store Pvt Ltd" className="dp-input" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: C.dark, display: "block", marginBottom: 8 }}>Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="rahul@mystore.com" className="dp-input" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: C.dark, display: "block", marginBottom: 8 }}>WhatsApp Number *</label>
                  <input required name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+91 98765 43210" className="dp-input" style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: C.dark, display: "block", marginBottom: 8 }}>What do you need help with? *</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="e.g. I run an e-commerce store and want to understand which products drive the most profit..." className="dp-input" style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              {status === "error" && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: 14, fontWeight: 500, padding: "12px 16px", borderRadius: 10, marginBottom: 20 }}>
                  {errorMsg}
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.01, boxShadow: "0 10px 32px rgba(16,185,129,0.35)" }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={status === "submitting"}
                className="premium-shine"
                style={{ ...s.btnPrimary, width: "100%", justifyContent: "center", fontSize: 16, padding: "16px", opacity: status === "submitting" ? 0.7 : 1, borderRadius: 12 }}
              >
                {status === "submitting" ? "Sending…" : "Get My Free Audit →"}
              </motion.button>
            </form>
          </FadeUp>
        )}
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────
const BRAND_CONTACTS = [
  {
    icon: <PREMIUM_GMAIL_ICON />,
    label: "Email",
    val: "miraiinformatics@gmail.com",
    action: () => window.open("mailto:miraiinformatics@gmail.com?subject=Analytics%20Consultation%20Inquiry", "_self"),
    bg: "radial-gradient(circle, #FFEAEA 0%, #FFF1F1 100%)",
    shadow: "0 8px 24px rgba(234, 67, 53, 0.15)",
  },
  {
    icon: <PREMIUM_WHATSAPP_ICON />,
    label: "WhatsApp",
    val: "+91 7700032709",
    action: openWhatsAppSystem,
    bg: "linear-gradient(135deg, #128C7E 0%, #25D366 100%)",
    shadow: "0 12px 28px rgba(37, 211, 102, 0.35)",
    isWhatsApp: true,
  },
  {
    icon: <LINKEDIN_ICON />,
    label: "LinkedIn",
    val: "Mirai Informatics",
    action: () => window.open("https://www.linkedin.com/company/mirai-informatics", "_blank", "noopener,noreferrer"),
    bg: "radial-gradient(circle, #E6F0FA 0%, #F0F7FF 100%)",
    shadow: "0 8px 24px rgba(10, 102, 194, 0.12)",
  },
  {
    icon: <LOCATION_ICON />,
    label: "Location",
    val: "Pune, Maharashtra, India",
    action: null,
    bg: "radial-gradient(circle, #FFF0F2 0%, #FFF5F6 100%)",
    shadow: "0 8px 24px rgba(239, 68, 68, 0.08)",
  }
];

function Contact() {
  return (
    <section style={{ ...s.section, background: C.blue }} id="contact">
      <div style={{ ...s.container, maxWidth: 1040 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <FadeUp>
            <span style={s.eyebrow}>✦ Contact Matrix</span>
            <h2 style={s.h2}>Let's start the conversation</h2>
            <p style={{ ...s.lead, marginBottom: 0 }}>Reach out via any channel — our analytics core responds within a few hours.</p>
          </FadeUp>
        </div>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {BRAND_CONTACTS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 24px 48px rgba(15,23,42,0.08)" }}
                onClick={item.action ? item.action : undefined}
                className="premium-shine"
                style={{
                  background: C.white, border: `1px solid ${C.border}`, borderRadius: 24,
                  padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center",
                  textAlign: "center", cursor: item.action ? "pointer" : "default", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: item.isWhatsApp ? "50%" : 18,
                  background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                  boxShadow: item.shadow, animation: item.isWhatsApp ? "pulseGlow 3s ease-in-out infinite" : "none"
                }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.tertiary, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, lineHeight: 1.5, wordBreak: "break-word" }}>{item.val}</div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHATSAPP FLOATING ───────────────────────────────────────────
function WhatsAppFloatingButton() {
  return (
    <div className="fab-container" style={{ position: "fixed", bottom: 32, right: 32, zIndex: 9999 }}>
      <span className="fab-tooltip">Chat with Mirai Informatics</span>
      <motion.button
        onClick={openWhatsAppSystem}
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 60, height: 60, borderRadius: "50%", border: "none",
          background: "linear-gradient(135deg, #128C7E 0%, #25D366 100%)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(37, 211, 102, 0.4)",
          cursor: "pointer",
          animation: "pulseGlow 3s ease-in-out infinite",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.button>
    </div>
  );
}

// ─── FOOTER WITH REPLACED LOGO AND CAPABILITIES ──────────────────
function Footer() {
  const services = ["Sales Analytics", "Power BI Dashboards", "Marketing Analytics", "Customer Analytics", "Reporting Automation", "Data Visualization"];
  const links = ["Services", "Portfolio", "Process", "Team", "Contact"];
  return (
    <footer style={{ background: C.navy, color: "#CBD5E1", paddingTop: 80, paddingBottom: 44 }}>
      <div style={s.container}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 52, marginBottom: 52 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <img 
                src={logoImg} 
                alt="Mirai Informatics Logo" 
                style={{ height: 48, width: "auto", objectFit: "contain" }} 
              />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: C.white, letterSpacing: "0.03em", textTransform: "uppercase" }}>Mirai<br />Informatics</span>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.75, maxWidth: 280, color: "#94A3B8" }}>A data analytics consulting firm helping enterprise infrastructure networks and growing brands clean up complex metric loops.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#E2E8F0", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.1em" }}>Quick Links</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {links.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 14, color: "#64748B", transition: "color 0.2s", fontWeight: 500 }}
                  onMouseEnter={e => e.currentTarget.style.color = C.green}
                  onMouseLeave={e => e.currentTarget.style.color = "#64748B"}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#E2E8F0", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.1em" }}>Services</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {services.map(sv => <span key={sv} style={{ fontSize: 14, color: "#64748B", fontWeight: 500 }}>{sv}</span>)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#E2E8F0", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.1em" }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14, color: "#64748B" }}>
              <a href="mailto:miraiinformatics@gmail.com" style={{ color: "#64748B", wordBreak: "break-word" }}>📧 miraiinformatics@gmail.com</a>
              <div>💬 WhatsApp: +91 7700032709</div>
              <div>📍 Pune, Maharashtra, India</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={openWhatsAppSystem}
              className="premium-shine"
              style={{ display: "inline-block", marginTop: 24, padding: "12px 24px", background: C.green, color: C.white, border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}
            >
              Get Free Audit →
            </motion.button>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #0F2240", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "#334155", flexWrap: "wrap", gap: 12 }}>
          <span>© 2026 Mirai Informatics. All rights reserved.</span>
          <span>Built with passion in Maharashtra 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME ────────────────────────────────────────────────────────
function Home() {
  return (
    <div style={{ background: C.white, width: "100%", overflowX: "hidden" }}>
      <SEO />
      <Navbar />
      <Hero />
      <WhyUs />
      <Stats />
      <ClientBenefits />
      <ToolsShowcase />
      <Problems />
      <Services />
      <Portfolio />
      <Industries />
      <Process />
      <Founders />
      <AuditForm />
      <Contact />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

function SEO() {
  useEffect(() => {
    document.title = "Mirai Informatics | Premium Data Architecture Consulting";
  }, []);
  return null;
}

// ─── APP MAIN CONTAINER ──────────────────────────────────────────
export default function App() {
  useEffect(() => {
    if (!document.getElementById("dp-global")) {
      const style = document.createElement("style");
      style.id = "dp-global";
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:dashboardId" element={<DashboardDetails />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}