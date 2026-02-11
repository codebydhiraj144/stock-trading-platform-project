import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext"; // Import your context

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  
  // 1. Access the global refresh trigger from Context
  const { needsUpdate } = useContext(GeneralContext);

  // 2. Session Persistence
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(decodeURIComponent(userString)) : null;

  // 3. Data Fetching with Filtering and Update Trigger
  useEffect(() => {
    if (user && user.username) {
      // We pass the specific user to the backend to get "New User" data only
      axios.get(`http://localhost:3002/allHoldings?user=${user.username}`)
        .then((res) => {
          setHoldings(res.data);
        });
    } else {
      setHoldings([]); // Reset if no user is logged in
    }
  }, [needsUpdate]); // <--- THIS ensures it updates immediately after a Buy/Sell

  /**
   * 4. Financial Data Aggregation: 
   * Calculations remain exactly the same to preserve your logic.
   */
  const totalInvestment = holdings.reduce((sum, stock) => sum + (stock.avg * stock.qty), 0);
  const currentValue = holdings.reduce((sum, stock) => sum + (stock.price * stock.qty), 0);
  const totalPnL = currentValue - totalInvestment;
  const isProfit = totalPnL >= 0;

  return (
    <>
      <div className="dashboard-header">
        <h6>Hi, {user ? user.username : "User"}</h6>
        <hr className="divider"/>
      </div>

      <div className="section">
        <span><p>Equity</p></span>
        <div className="data">
          <div className="first">
            <h3 className="bold">3.7k</h3>
            <p>Margin available</p>
          </div>
          <hr/>
          <div className="second">
            <p>Margin used <span>0</span></p>
            <p>Opening balance <span>3.74k</span></p>
          </div>
        </div>
        <hr className="divider"/>
      </div>

      <div className="section">
        {/* This will now correctly show (0) for a new user and (1) after a buy */}
        <span>Holding ({holdings.length})</span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {totalPnL.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              <small style={{ marginLeft: "5px" }}>
                {totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0}%
              </small>
            </h3>
            <p>p&L</p>
          </div>
          <hr/>
          <div className="second">
            <p>Current Value <span>{currentValue.toLocaleString('en-IN')}</span></p>
            <p>Investment <span>{totalInvestment.toLocaleString('en-IN')}</span></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;