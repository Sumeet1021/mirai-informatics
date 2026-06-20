import { useState, useEffect, useCallback } from "react";

const C = {
  green: "#10B981", greenLight: "#D1FAE5", greenDark: "#065F46",
  white: "#FFFFFF", dark: "#0F172A", secondary: "#475569",
  border: "#E2E8F0", offWhite: "#FAFAFA",
};

// ─── FULLSCREEN LIGHTBOX ─────────────────────────────────────────
function FullscreenViewer({ images, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const [zoom, setZoom] = useState(1);

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + images.length) % images.length);
    setZoom(1);
  }, [images.length]);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % images.length);
    setZoom(1);
  }, [images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const btnStyle = {
    background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff", fontSize: 16, cursor: "pointer",
    width: 36, height: 36, borderRadius: 8,
    display: "flex", alignItems: "center", justifyContent: "center",
  };

  const navBtnStyle = {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff", fontSize: 36, cursor: "pointer",
    width: 56, height: 56, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.2s",
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.96)",
        zIndex: 9999, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}
      onClick={onClose}
    >
      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: 20, right: 24,
        background: "rgba(255,255,255,0.1)", border: "none",
        color: "#fff", fontSize: 22, cursor: "pointer",
        width: 44, height: 44, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>✕</button>

      {/* Counter */}
      <div style={{
        position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)",
        color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: 500,
        background: "rgba(255,255,255,0.1)", padding: "4px 14px", borderRadius: 20,
      }}>
        {idx + 1} / {images.length}
      </div>

      {/* Zoom Controls */}
      <div style={{ position: "absolute", top: 20, left: 24, display: "flex", gap: 8 }}>
        <button onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(0.5, z - 0.25)); }}
          style={btnStyle}>−</button>
        <button onClick={(e) => { e.stopPropagation(); setZoom(1); }}
          style={{ ...btnStyle, minWidth: 52, fontSize: 12 }}>{Math.round(zoom * 100)}%</button>
        <button onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(3, z + 0.25)); }}
          style={btnStyle}>+</button>
      </div>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ overflow: "auto", maxWidth: "92vw", maxHeight: "82vh", borderRadius: 12 }}
      >
        <img
          src={images[idx]}
          alt={`Dashboard page ${idx + 1}`}
          style={{
            display: "block",
            maxWidth: zoom === 1 ? "92vw" : "none",
            width: zoom !== 1 ? `${zoom * 900}px` : "auto",
            maxHeight: zoom === 1 ? "82vh" : "none",
            borderRadius: 8,
            boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
          }}
        />
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{ ...navBtnStyle, left: 20 }}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); next(); }}
            style={{ ...navBtnStyle, right: 20 }}>›</button>
        </>
      )}

      {/* Thumbnail strip at bottom */}
      {images.length > 1 && (
        <div style={{
          position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 8,
        }}>
          {images.map((img, i) => (
            <div key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); setZoom(1); }}
              style={{
                width: 60, height: 40, borderRadius: 6, overflow: "hidden", cursor: "pointer",
                border: `2px solid ${i === idx ? C.green : "rgba(255,255,255,0.3)"}`,
                transition: "border-color 0.2s", flexShrink: 0,
              }}>
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN GALLERY COMPONENT ───────────────────────────────────────
export default function DashboardGallery({ images = [], color = C.green }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div style={{
        background: `linear-gradient(135deg, ${color}15, ${color}30)`,
        borderRadius: 16, padding: 48, textAlign: "center",
        border: `2px dashed ${color}40`, minHeight: 280,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📊</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: C.dark }}>Screenshots coming soon</div>
      </div>
    );
  }

  return (
    <div>
      {/* Main Preview */}
      <div
        style={{
          position: "relative", borderRadius: 16, overflow: "hidden",
          background: "#000", cursor: "zoom-in",
          border: `1px solid ${C.border}`, marginBottom: 12,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
        onClick={() => setFullscreen(true)}
      >
        <img
          src={images[activeIdx]}
          alt={`Dashboard view ${activeIdx + 1}`}
          style={{ width: "100%", display: "block", objectFit: "contain", maxHeight: 440 }}
        />
        {/* Overlay hint */}
        <div style={{
          position: "absolute", bottom: 12, right: 12,
          background: "rgba(0,0,0,0.6)", color: "#fff",
          padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
          backdropFilter: "blur(4px)", display: "flex", alignItems: "center", gap: 6,
        }}>
          🔍 Click to fullscreen
        </div>

        {/* Page label */}
        {images.length > 1 && (
          <div style={{
            position: "absolute", top: 12, left: 12,
            background: "rgba(0,0,0,0.6)", color: "#fff",
            padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
          }}>
            Page {activeIdx + 1} of {images.length}
          </div>
        )}

        {/* Arrows on main image */}
        {images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setActiveIdx((i) => (i - 1 + images.length) % images.length); }}
              style={{
                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.55)", border: "none", color: "#fff",
                width: 38, height: 38, borderRadius: "50%", cursor: "pointer",
                fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
              }}>‹</button>
            <button onClick={(e) => { e.stopPropagation(); setActiveIdx((i) => (i + 1) % images.length); }}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.55)", border: "none", color: "#fff",
                width: 38, height: 38, borderRadius: "50%", cursor: "pointer",
                fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
              }}>›</button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
          {images.map((img, i) => (
            <div key={i} onClick={() => setActiveIdx(i)} style={{
              flexShrink: 0, width: 88, height: 60, borderRadius: 8,
              overflow: "hidden", cursor: "pointer",
              border: `2px solid ${i === activeIdx ? color : C.border}`,
              transition: "border-color 0.2s, transform 0.15s",
              transform: i === activeIdx ? "scale(1.05)" : "scale(1)",
            }}>
              <img src={img} alt={`Page ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 13, color: C.secondary }}>
          {activeIdx + 1} of {images.length} dashboard pages
        </div>
      )}

      {/* Lightbox */}
      {fullscreen && (
        <FullscreenViewer
          images={images}
          startIdx={activeIdx}
          onClose={() => setFullscreen(false)}
        />
      )}
    </div>
  );
}