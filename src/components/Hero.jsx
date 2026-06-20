const Hero = () => {
  return (
    <section
      style={{
        minHeight: "90vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "1000px" }}>
        <span
          style={{
            background: "#10b981",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "14px",
          }}
        >
          🚀 Data Analytics For Business Growth
        </span>

        <h1
          style={{
            fontSize: "4.5rem",
            marginTop: "30px",
            marginBottom: "20px",
            lineHeight: "1.1",
          }}
        >
          Turn Your Business Data Into Growth
        </h1>

        <p
          style={{
            fontSize: "1.3rem",
            color: "#d1d5db",
            maxWidth: "750px",
            margin: "0 auto",
          }}
        >
          We help e-commerce brands and small businesses increase
          revenue using dashboards, analytics, KPI tracking,
          and actionable business insights.
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              background: "#10b981",
              color: "white",
              border: "none",
              padding: "16px 30px",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Get Free Audit
          </button>

          
            <a
  href="#audit"
  style={{
    background: "#10b981",
    color: "white",
    padding: "16px 30px",
    borderRadius: "10px",
    textDecoration: "none",
    display: "inline-block",
  }}
>
  Get Free Audit
</a>
          
            View Portfolio
          
        </div>
      </div>
    </section>
  );
};

export default Hero;