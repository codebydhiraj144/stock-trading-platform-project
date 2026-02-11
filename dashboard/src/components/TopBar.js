import React, { useState, useEffect } from "react";
import Menu from "./Menu";

const TopBar = () => {
  // Initializing state with realistic market values
  const [nifty, setNifty] = useState(21710.85);
  const [sensex, setSensex] = useState(71500.20);

  // Simulating live market movement
  useEffect(() => {
    const interval = setInterval(() => {
      // Logic: Generate a small random fluctuation to simulate a live feed
      const fluctuation = (Math.random() * 2 - 1).toFixed(2);
      setNifty((prev) => parseFloat((prev + parseFloat(fluctuation)).toFixed(2)));
      setSensex((prev) => parseFloat((prev + parseFloat(fluctuation) * 3).toFixed(2)));
    }, 3000); // Updates every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY <span className="index-points">50</span></p>
          {/* Formats number with commas for Indian currency standards */}
          <p className="index-gap">{nifty.toLocaleString("en-IN")}</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-gap">{sensex.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Menu contains Links, UserID, and Logout */}
      <Menu /> 
    </div>
  );
};

export default TopBar;