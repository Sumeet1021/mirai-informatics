const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        background: "#25D366",
        color: "white",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
        fontSize: "28px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        zIndex: 999,
      }}
    >
      💬
    </a>
  );
};

export default WhatsAppButton;