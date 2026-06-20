const Pricing = () => {
  const plans = [
    {
      title: "Starter",
      price: "₹4,999",
      features: [
        "1 Dashboard",
        "KPI Tracking",
        "Basic Reporting",
      ],
    },
    {
      title: "Growth",
      price: "₹14,999",
      features: [
        "Multiple Dashboards",
        "Monthly Reports",
        "Business Insights",
      ],
    },
    {
      title: "Custom",
      price: "Contact Us",
      features: [
        "Advanced Analytics",
        "Automation",
        "Forecasting",
      ],
    },
  ];

  return (
    <section
      style={{
        padding: "100px 80px",
        background: "#111827",
        color: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "3rem",
          marginBottom: "60px",
        }}
      >
        Pricing Plans
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "30px",
        }}
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              background: "#1f2937",
              padding: "40px",
              borderRadius: "15px",
            }}
          >
            <h3>{plan.title}</h3>

            <h2
              style={{
                marginTop: "15px",
                color: "#10b981",
              }}
            >
              {plan.price}
            </h2>

            <ul
              style={{
                marginTop: "20px",
              }}
            >
              {plan.features.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;