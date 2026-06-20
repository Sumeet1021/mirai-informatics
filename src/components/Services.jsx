const Services = () => {
  const services = [
    {
      title: "Sales Analytics",
      desc: "Track revenue, sales trends, and product performance.",
    },
    {
      title: "Business Intelligence",
      desc: "Interactive dashboards and KPI tracking.",
    },
    {
      title: "Marketing Analytics",
      desc: "Measure campaign ROI and customer acquisition.",
    },
    {
      title: "Reporting Automation",
      desc: "Automate Excel reports and repetitive workflows.",
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
          marginBottom: "50px",
        }}
      >
        Our Services
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "30px",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              background: "#1f2937",
              padding: "30px",
              borderRadius: "15px",
            }}
          >
            <h3>{service.title}</h3>

            <p
              style={{
                marginTop: "15px",
                color: "#d1d5db",
              }}
            >
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;