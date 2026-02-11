import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from "./components/Home";
import { GeneralContextProvider } from "./components/GeneralContext"; // Import Provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap everything inside the GeneralContextProvider */}
    <GeneralContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GeneralContextProvider>
  </React.StrictMode>
);