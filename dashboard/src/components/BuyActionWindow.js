import React, { useState, useContext, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import axios from "axios";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow, triggerRefresh, selectedStockPrice } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState("");

  useEffect(() => {
    setStockPrice(selectedStockPrice);
  }, [selectedStockPrice]);

  const handleBuyClick = async () => {
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);
    const marketPrice = Number(selectedStockPrice);

    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(decodeURIComponent(userString)) : null;
    const username = userData?.username;

    if (!username) {
      alert("⛔ Session expired. Please log in again.");
      return;
    }

    if (qty <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    // --- 5% RANGE LOGIC ---
    const upperLimit = marketPrice * 1.05;
    const lowerLimit = marketPrice * 0.95;

    if (price > upperLimit || price < lowerLimit) {
      alert(
        `⛔ Price Out of Range!\n` +
        `Current Market Price: ₹${marketPrice}\n` +
        `You can only buy between: ₹${lowerLimit.toFixed(2)} - ₹${upperLimit.toFixed(2)}`
      );
      return;
    }
    // -----------------------

    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: qty,
        price: price,
        mode: "Buy",
        user: username,
      });

      alert("✅ Buy Order Placed Successfully!");
      triggerRefresh(); 
      closeBuyWindow();
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Order failed!"}`);
    }
  };

  return (
    <div className="containerClass buy-window" id="buy-window">
      <div className="buy-window-header" style={{ borderBottom: "1px solid #eee", marginBottom: "15px", paddingBottom: "10px" }}>
        <h3 style={{ margin: 0, color: "#444" }}>Buy {uid}</h3>
        <p style={{ fontSize: "12px", color: "#9b9b9b", margin: "5px 0 0 0" }}>NSE Equity</p>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input 
              type="number" 
              onChange={(e) => setStockQuantity(e.target.value)} 
              value={stockQuantity} 
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input 
              type="number" 
              step="0.05" 
              value={stockPrice} 
              onChange={(e) => setStockPrice(e.target.value)} 
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        {/* FIXED: Using state variables to avoid ESLint 'no-undef' errors */}
        <span>Margin required ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>Buy</button>
          <button className="btn btn-grey" onClick={() => closeBuyWindow()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;