import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  // Tracking active menu item for UI/UX feedback (highlighting selected tab)
  const [selectedMenu, setSelectedMenu] = useState(0);

  // Retrieving session data from localStorage to display user-specific info
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  /**
   * Clears the current session and performs a cross-origin redirect
   * to the authentication service on Port 3000.
   */
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    window.location.href = "http://localhost:3000/login"; 
  };

  return (
    <div className="menu-container">
      <ul className="menu-list">
        {/* Navigation links with dynamic class toggling based on selection state */}
        <li><Link to="/" onClick={() => setSelectedMenu(0)} className={selectedMenu === 0 ? "menu selected" : "menu"}>Dashboard</Link></li>
        <li><Link to="/orders" onClick={() => setSelectedMenu(1)} className={selectedMenu === 1 ? "menu selected" : "menu"}>Orders</Link></li>
        <li><Link to="/holdings" onClick={() => setSelectedMenu(2)} className={selectedMenu === 2 ? "menu selected" : "menu"}>Holdings</Link></li>
        <li><Link to="/positions" onClick={() => setSelectedMenu(3)} className={selectedMenu === 3 ? "menu selected" : "menu"}>Positions</Link></li>
        <li><Link to="/funds" onClick={() => setSelectedMenu(4)} className={selectedMenu === 4 ? "menu selected" : "menu"}>Funds</Link></li>
        <li><Link to="/apps" onClick={() => setSelectedMenu(5)} className={selectedMenu === 5 ? "menu selected" : "menu"}>Apps</Link></li>
      </ul>
      
      <div className="profile-section">
        <div className="avatar">ZU</div>
        <p className="username">
          {/* Dynamically rendering the username stored during login handshake */}
          {user ? user.username.toUpperCase() : "USERID"}
        </p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Menu;