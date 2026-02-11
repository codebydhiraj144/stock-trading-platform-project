import React, { useState, useContext, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import axios from "axios";

const SellActionWindow = ({ uid }) => {
  const { closeSellWindow, triggerRefresh, selectedStockPrice, selectedStockQty } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState("");

  // Syncing the input price with the current Market Price (LTP) on mount
  useEffect(() => { 
    setStockPrice(selectedStockPrice); 
  }, [selectedStockPrice]);

  const handleSellClick = async () => {
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);
    const marketPrice = Number(selectedStockPrice);

    // 1. Retrieve the logged-in user
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(decodeURIComponent(userString)) : null;
    const username = userData?.username;

    if (!username) {
      alert("⛔ Error: User session not found. Please log in again.");
      return;
    }

    // 2. Quantity Validations
    if (qty <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (qty > selectedStockQty) {
        alert(`⛔ You only own ${selectedStockQty} shares!`);
        return;
    }

    // 3. --- 5% RANGE LOGIC (Circuit Limit) ---
    const upperLimit = marketPrice * 1.05;
    const lowerLimit = marketPrice * 0.95;

    if (price > upperLimit || price < lowerLimit) {
      alert(
        `⛔ Price Out of Range!\n` +
        `Market Price: ₹${marketPrice}\n` +
        `You can only sell between: ₹${lowerLimit.toFixed(2)} - ₹${upperLimit.toFixed(2)}`
      );
      return;
    }
    // ------------------------------------------
    
    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid, 
        qty: qty, 
        price: price, 
        mode: "Sell",
        user: username,
      });

      alert("✅ Sell Order Placed Successfully!");
      triggerRefresh(); 
      closeSellWindow();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Order Failed";
      alert(` ${errorMsg}`);
    }
  };

  return (
    <div className="containerClass sell-window">
      <div className="sell-header" style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
        <h3 style={{ margin: 0 }}>Sell {uid}</h3>
        <p style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}>
            Available Holdings: <span style={{ color: "#df5148", fontWeight: "bold" }}>{selectedStockQty}</span>
        </p>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input type="number" onChange={(e) => setStockQuantity(e.target.value)} value={stockQuantity} />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input type="number" step="0.05" value={stockPrice} onChange={(e) => setStockPrice(e.target.value)} />
          </fieldset>
        </div>
      </div>
      
      <div className="buttons">
        {/* FIXED: Using state variables to avoid 'qty is not defined' ESLint errors */}
        <span>Receivable Amount: ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}</span>
        <div>
          <button className="btn btn-red" onClick={handleSellClick}>Sell</button>
          <button className="btn btn-grey" onClick={() => closeSellWindow()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;