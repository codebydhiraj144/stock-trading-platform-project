import React from "react";
const Apps = () => {
  const tools = [
    { name: "Smallcase", desc: "Thematic investment platforms", icon: "📈" },
    { name: "Sensibull", desc: "Options trading strategy builder", icon: "📊" },
    { name: "Streak", desc: "Algo trading and backtesting", icon: "🤖" },
    { name: "GoldenPi", desc: "Bonds and debentures platform", icon: "💰" },
  ];

  return (
    <div className="apps-container" style={{ padding: "40px" }}>
      <h2 style={{ color: "#444" }}>Marketplace</h2>
      <p style={{ color: "#999" }}>External apps powered by your Kite account</p>
      
      <div className="apps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "30px" }}>
        {tools.map((app) => (
          <div key={app.name} className="app-card" style={{ border: "1px solid #eee", padding: "20px", borderRadius: "8px" }}>
            <h3>{app.icon} {app.name}</h3>
            <p>{app.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Apps;
