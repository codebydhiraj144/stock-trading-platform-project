import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../api";
const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  // Fixed ESLint Warning: Removed triggerRefresh if not used for a specific action, 
  // but kept needsUpdate for automatic syncing.
  const { needsUpdate, triggerRefresh } = useContext(GeneralContext);

  const fetchPositions = () => {
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(decodeURIComponent(userString)) : null;

    if (userData && userData.username) {
    axios.get(`${API_BASE_URL}/allPositions?user=${userData.username}`)
        .then((res) => setAllPositions(res.data))
        .catch((err) => console.error("Error fetching positions:", err));
    }
  };

  // Sync with global updates (Buy/Sell actions)
  useEffect(() => {
    fetchPositions();
  }, [needsUpdate]);

  const totalPL = allPositions.reduce((acc, stock) => {
    return acc + (Number(stock.price) - Number(stock.avg)) * Number(stock.qty);
  }, 0);

  return (
    <div className="positions-container">
      <div className="header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="title">Positions ({allPositions.length})</h3>
        
        {/* --- MANUAL REFRESH BUTTON RESTORED --- */}
        <button 
          onClick={() => {
            fetchPositions(); // Manual Fetch
            triggerRefresh(); // Sync other components too
          }} 
          className="btn btn-grey" 
          style={{ padding: "5px 10px", fontSize: "12px", cursor: "pointer" }}
        >
          Refresh Data
        </button>
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const pnl = (stock.price - stock.avg) * stock.qty;
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td style={{ color: stock.qty >= 0 ? "#4caf50" : "#ff5722" }}>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td style={{ color: pnl >= 0 ? "#4caf50" : "#ff5722" }}>{pnl.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="positions-footer">
        <span>Total P&L: </span>
        <span style={{ color: totalPL >= 0 ? "#4caf50" : "#ff5722", fontWeight: "bold" }}>
          {totalPL.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Positions;