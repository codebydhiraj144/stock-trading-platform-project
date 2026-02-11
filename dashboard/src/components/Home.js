import React from "react";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

const Home = () => {
    // 1. Session Handshake: Extract user data passed from the Login app (Port 3000)
    const queryParams = new URLSearchParams(window.location.search);
    const userFromUrl = queryParams.get("user");

    if (userFromUrl) {
        // Persist session in Port 3001's LocalStorage for state continuity
        localStorage.setItem("user", userFromUrl);
        
        // Sanitize URL by removing query parameters to improve UX and security
        window.history.replaceState({}, document.title, "/");
    }

    // 2. Session Validation: Check if a valid user session exists in storage
    const user = localStorage.getItem("user");

    // 3. Authentication Guard: Redirect unauthorized access back to the Auth Service
    if (!user) {
        window.location.href = "http://localhost:3000/login";
        return null; // Prevent component mounting during redirect
    }

    // 4. Authorized Access: Render main application components
    return (
        <>
            <TopBar />
            <Dashboard />
        </>
    );
};

export default Home;