const Problems = () => {
  const problems = [
    {
      title: "Scattered Business Data",
      desc: "Data spread across Excel files, CRMs, and platforms makes decision-making difficult.",
      icon: "📊",
    },
    {
      title: "No KPI Tracking",
      desc: "Most businesses don't know which metrics truly drive growth and profitability.",
      icon: "📈",
    },
    {
      title: "Manual Reporting",
      desc: "Hours wasted every week creating reports instead of growing the business.",
      icon: "⏳",
    },
    {
      title: "Missed Revenue Opportunities",
      desc: "Hidden insights remain undiscovered without proper analytics and dashboards.",
      icon: "💰",
    },
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
          marginBottom: "20px",
        }}
      >
        Problems We Solve
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#6b7280",
          marginBottom: "60px",
          fontSize: "1.1rem",
        }}
      >
        Helping businesses transform data into actionable insights.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "30px",
        }}
      >
        {problems.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#f9fafb",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ fontSize: "2rem" }}>{item.icon}</h3>

            <h3
              style={{
                marginTop: "15px",
                marginBottom: "10px",
              }}
            >
              {item.title}
            </h3>

            <p style={{ color: "#6b7280" }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Problems;