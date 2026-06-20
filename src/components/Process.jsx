const Process = () => {
  const steps = [
    "Understand Business",
    "Collect Data",
    "Analyze Data",
    "Build Dashboard",
    "Deliver Insights",
  ];

  return (
    <section
      style={{
        padding: "100px 80px",
        background: "#ffffff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "3rem",
          marginBottom: "60px",
        }}
      >
        Our Process
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              flex: "1",
              minWidth: "180px",
              background: "#f9fafb",
              padding: "30px",
              textAlign: "center",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ color: "#10b981" }}>
              Step {index + 1}
            </h3>

            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;