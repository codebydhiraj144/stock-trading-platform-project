import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GeneralContext from "./GeneralContext";
import { VerticalChart } from "./VerticalChart";
import { API_BASE_URL } from "../api";
const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const { needsUpdate } = useContext(GeneralContext);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(decodeURIComponent(userString)) : null;

    if (userData && userData.username) {
      axios.get(`${API_BASE_URL}/allHoldings?user=${userData.username}`)
        .then((res) => {
          setAllHoldings(res.data);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
        });
    }
  }, [needsUpdate]); 

  const filteredHoldings = allHoldings.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalInvestment = allHoldings.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
  const currentTotalValue = allHoldings.reduce((acc, stock) => acc + (stock.price * stock.qty), 0);
  const totalPL = currentTotalValue - totalInvestment;
  const plPercentage = totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : "0.00";

  // --- CHART COLOR LOGIC ---
  const barColors = [
    "rgba(255, 99, 132, 0.5)",   // Pink/Red
    "rgba(54, 162, 235, 0.5)",   // Blue
    "rgba(255, 206, 86, 0.5)",   // Yellow
    "rgba(75, 192, 192, 0.5)",   // Teal
    "rgba(153, 102, 255, 0.5)",  // Purple
    "rgba(255, 159, 64, 0.5)",   // Orange
    "rgba(201, 203, 207, 0.5)"   // Grey
  ];

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        // Assigning a color to each bar based on its index
        backgroundColor: allHoldings.map((_, index) => barColors[index % barColors.length]),
        borderColor: allHoldings.map((_, index) => barColors[index % barColors.length].replace("0.5", "1")),
        borderWidth: 1,
      }
    ]
  };
  // -------------------------

  return (
    <div className="holdings-container">
      <div className="holdings-header">
        <h3 className="title">Holdings ({allHoldings.length})</h3>
        <input
          type="text"
          placeholder="Search stock (e.g. INFY, TCS)"
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {filteredHoldings.map((stock, index) => {
              const curValue = (stock.price || 0) * stock.qty;
              const totalCost = (stock.avg || 0) * stock.qty;
              const stockPL = curValue - totalCost;
              const isProfit = stockPL >= 0;
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg ? stock.avg.toFixed(2) : "0.00"}</td>
                  <td>{stock.price ? stock.price.toFixed(2) : "0.00"}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={isProfit ? "profit" : "loss"}>{stockPL.toFixed(2)}</td>
                  <td className={isProfit ? "profit" : "loss"}>{stock.net || "0.00%"}</td>
                  <td className={stock.day?.startsWith("-") ? "loss" : "profit"}>{stock.day || "0.00%"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row stats-row">
        <div className="col">
          <h5>{totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{currentTotalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPL >= 0 ? "profit" : "loss"}>
            {totalPL.toFixed(2)} ({plPercentage}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      
      <div className="holdings-distribution">
         <VerticalChart data={data}/>
      </div>
    </div>
  );
};

export default Holdings;