import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(decodeURIComponent(userString)) : null;

    if (userData && userData.username) {
      axios.get(`${API_BASE_URL}/allOrders?user=${userData.username}`).then((res) => {
        setAllOrders(res.data.reverse());
      });
    }
  }, []);

  return (
    <div className="orders">
      <h3 className="title">Orders ({allOrders.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Status</th> 
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <tr key={index}>
               <td>
  {order.time && !isNaN(new Date(order.time).getTime()) 
    ? new Date(order.time).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }) 
    : order.time || "--:--"}
</td>
                <td style={{ fontWeight: "bold" }}>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price.toFixed(2)}</td>
                <td><span className="status-badge">{order.status || "COMPLETE"}</span></td>
                <td className={order.mode === "BUY" ? "buy-label" : "sell-label"}>{order.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;