const Stats = () => {
  const stats = [
    {
      number: "50+",
      label: "Dashboards Built",
    },
    {
      number: "10+",
      label: "Industries Covered",
    },
    {
      number: "100%",
      label: "Custom Solutions",
    },
    {
      number: "24/7",
      label: "Support",
    },
  ];

  return (
    <section
      style={{
        background: "#111827",
        color: "white",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "30px",
          textAlign: "center",
        }}
      >
        {stats.map((stat, index) => (
          <div key={index}>
            <h2
              style={{
                fontSize: "3rem",
                color: "#10b981",
              }}
            >
              {stat.number}
            </h2>

            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;