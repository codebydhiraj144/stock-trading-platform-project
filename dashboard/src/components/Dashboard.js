import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Summary from "./Summary";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";
import Apps from "./Apps";
import WatchList from "./WatchList";
import GeneralContext from "./GeneralContext"; 
import BuyActionWindow from "./BuyActionWindow"; 
import SellActionWindow from "./SellActionWindow";

const Dashboard = () => {
  // Accessing Global UI state via Context to handle Buy/Sell window visibility
  const { isBuyWindowOpen, isSellWindowOpen, selectedStockUID } = useContext(GeneralContext);

  // Cross-App Session Management: Capturing user data from auth redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get("user");

    if (userParam) {
      try {
        // Persisting session in localStorage to support page refreshes
        localStorage.setItem("user", userParam);
        // Sanitizing the URL to remove sensitive query parameters
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (err) {
        console.error("Session sync error:", err);
      }
    }
  }, []);

  return (
    <div className="dashboard-container">
      <WatchList />
  
      {/* Dynamic Layout: Adjusts content margin based on Action Window state */}
      <div className={`dashboard-content ${isBuyWindowOpen || isSellWindowOpen ? "app-margin" : ""}`}>
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>

      {/* Conditionally rendering Action Windows based on user selection */}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </div>
  );
};

export default Dashboard;