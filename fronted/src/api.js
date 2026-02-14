// frontend/src/api.js

// 1. Detect if you are running locally in VS Code
const isLocal = window.location.hostname === "localhost";

export const API_BASE_URL = "https://stock-trading-platform-project-t1ks.onrender.com";

// 2. Set the Dashboard URL based on where you are working
export const DASHBOARD_URL = isLocal 
    ? "http://localhost:3001"  // Change this to your local port (3000 or 3001)
    : "https://stock-trading-platform-project-dash.vercel.app"; // Use the PRODUCTION domain
