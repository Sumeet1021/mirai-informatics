import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const C = {
  green: "#10B981",
  greenLight: "#D1FAE5",
  greenDark: "#065F46",
  greenMid: "#059669",
  dark: "#0D1117",
  secondary: "#6B7280",
  border: "#E5E7EB",
  white: "#FFFFFF",
};

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

// Smooth scroll to section
function smoothScrollTo(href) {
  if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

// ─── MOBILE MENU ─────────────────────────────────────────────────
function MobileMenu({ open, onClose, activeSection }) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 1099,
              background: "rgba(13,17,23,0.6)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "min(340px, 88vw)", zIndex: 1100,
              background: C.white,
              boxShadow: "-20px 0 60px rgba(0,0,0,0.16)",
              display: "flex", flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "22px 28px",
              borderBottom: `1px solid ${C.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 34, height: 34, background: C.green, borderRadius: 9,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(16,185,129,0.35)",
                }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="10" width="4" height="8" rx="1.5" fill="white" />
                    <rect x="8" y="6" width="4" height="12" rx="1.5" fill="white" />
                    <rect x="14" y="2" width="4" height="16" rx="1.5" fill="white" />
                  </svg>
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: C.dark, letterSpacing: "-0.03em" }}>DataPulse</span>
              </div>
              <motion.button
                onClick={onClose}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "#F3F4F6", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke={C.secondary} strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>

            {/* Nav items */}
            <div style={{ padding: "16px 16px", flex: 1 }}>
              {NAV_LINKS.map((link, i) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={e => { e.preventDefault(); smoothScrollTo(link.href); onClose(); }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "14px 16px", borderRadius: 12, textDecoration: "none",
                      marginBottom: 4,
                      background: isActive ? C.greenLight : "transparent",
                      color: isActive ? C.greenDark : C.dark,
                      fontWeight: isActive ? 700 : 500,
                      fontSize: 15,
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* CTA */}
            <div style={{ padding: "20px 24px", borderTop: `1px solid ${C.border}` }}>
              <motion.a
                href="#audit"
                onClick={e => { e.preventDefault(); smoothScrollTo("#audit"); onClose(); }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, padding: "14px 24px",
                  background: C.green, color: C.white,
                  borderRadius: 12, textDecoration: "none",
                  fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em",
                  boxShadow: "0 4px 16px rgba(16,185,129,0.35)",
                }}
              >
                Get Free Audit
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
              <p style={{ textAlign: "center", fontSize: 12, color: C.secondary, marginTop: 10, marginBottom: 0 }}>
                No credit card · Respond in 24h
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── HAMBURGER ───────────────────────────────────────────────────
function Hamburger({ open, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      aria-label={open ? "Close menu" : "Open menu"}
      style={{
        width: 40, height: 40, borderRadius: 10,
        background: open ? C.greenLight : "#F3F4F6",
        border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 5, padding: 0,
        transition: "background 0.2s",
      }}
    >
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{ display: "block", width: 18, height: 2, background: open ? C.greenDark : C.dark, borderRadius: 2 }}
      />
      <motion.span
        animate={open ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: "block", width: 14, height: 2, background: open ? C.greenDark : C.dark, borderRadius: 2 }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{ display: "block", width: 18, height: 2, background: open ? C.greenDark : C.dark, borderRadius: 2 }}
      />
    </motion.button>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll state
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.replace("#", ""));
    const observers = [];

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(callback, {
          rootMargin: "-20% 0px -70% 0px",
          threshold: 0,
        });
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
          padding: scrolled ? "10px 0" : "18px 0",
          background: scrolled
            ? "rgba(255,255,255,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(200%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(200%)" : "none",
          borderBottom: scrolled ? `1px solid rgba(229,231,235,0.8)` : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <motion.a
            href="#"
            onClick={e => { e.preventDefault(); smoothScrollTo("#"); }}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}
            whileHover={{ opacity: 0.88 }}
          >
            <motion.div
              whileHover={{ scale: 1.06, boxShadow: "0 6px 20px rgba(16,185,129,0.45)" }}
              style={{
                width: 38, height: 38, background: C.green, borderRadius: 11,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
                transition: "box-shadow 0.2s",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="10" width="4" height="8" rx="1.5" fill="white" />
                <rect x="8" y="6" width="4" height="12" rx="1.5" fill="white" />
                <rect x="14" y="2" width="4" height="16" rx="1.5" fill="white" />
              </svg>
            </motion.div>
            <span style={{ fontSize: 17, fontWeight: 800, color: C.dark, letterSpacing: "-0.03em" }}>DataPulse</span>
          </motion.a>

          {/* Desktop nav */}
          <div
            className="nav-links"
            style={{ display: "flex", gap: 36, alignItems: "center" }}
          >
            {NAV_LINKS.map(link => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => { e.preventDefault(); smoothScrollTo(link.href); }}
                  style={{
                    position: "relative",
                    fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em",
                    color: isActive ? C.green : C.secondary,
                    textDecoration: "none",
                    transition: "color 0.2s",
                    paddingBottom: 2,
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = C.dark; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = C.secondary; }}
                >
                  {link.label}
                  {/* Animated underline */}
                  <motion.span
                    layoutId={isActive ? "nav-underline" : undefined}
                    style={{
                      position: "absolute", bottom: -2, left: 0, right: 0,
                      height: 2, borderRadius: 2, background: C.green,
                      display: "block",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left", position: "absolute", bottom: -2, left: 0, right: 0, height: 2, borderRadius: 2, background: C.green }}
                  />
                </a>
              );
            })}

            {/* CTA Button */}
            <motion.a
              href="#audit"
              onClick={e => { e.preventDefault(); smoothScrollTo("#audit"); }}
              whileHover={{
                background: "#059669",
                boxShadow: "0 8px 28px rgba(16,185,129,0.45)",
                y: -2,
              }}
              whileTap={{ y: 0, scale: 0.98 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: C.green, color: C.white,
                border: "none", borderRadius: 10,
                padding: "10px 20px", fontSize: 14, fontWeight: 700,
                cursor: "pointer", textDecoration: "none",
                letterSpacing: "-0.01em",
                boxShadow: "0 2px 8px rgba(16,185,129,0.28)",
              }}
            >
              Free Audit
              <motion.svg
                width="14" height="14" viewBox="0 0 16 16" fill="none"
                initial={{ x: 0 }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.a>
          </div>

          {/* Mobile hamburger — only visible below 768px via CSS */}
          <div style={{ display: "none" }} className="mobile-menu-btn">
            <Hamburger open={menuOpen} onClick={() => setMenuOpen(o => !o)} />
          </div>
        </div>
      </motion.nav>

      {/* CSS to show hamburger on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeSection={activeSection} />
    </>
  );
}