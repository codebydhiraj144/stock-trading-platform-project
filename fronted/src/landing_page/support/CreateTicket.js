import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mb-5">
        <h1 className="fs-3 text-center mb-4">
          To create a ticket, select a relevant topic
        </h1>

        {/* Column 1 */}
        <div className="col-md-4">
          <h4 className="mt-5">
            <i className="fa-solid fa-circle-plus me-2"></i>
            Account Opening
          </h4>

          <div style={{ lineHeight: "2.5" }}>
            <a href="#" className="text-decoration-none d-block">
              Online Account Opening
            </a>
            <a href="#" className="text-decoration-none d-block">
              Offline Account Opening
            </a>
            <a href="#" className="text-decoration-none d-block">
              Company, Partnership and HUF Account
            </a>
            <a href="#" className="text-decoration-none d-block">
              Charges at Zerodha
            </a>
            <a href="#" className="text-decoration-none d-block">
              Getting Started
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div className="col-md-4">
          <h4 className="mt-5">
            <i className="fa-solid fa-circle-plus me-2"></i>
            Your Zerodha Account
          </h4>

          <div style={{ lineHeight: "2.5" }}>
            <a href="#" className="text-decoration-none d-block">
              Login Credentials
            </a>
            <a href="#" className="text-decoration-none d-block">
              Account Modification & Segment Additions
            </a>
            <a href="#" className="text-decoration-none d-block">
              DP ID and Bank Details
            </a>
            <a href="#" className="text-decoration-none d-block">
              Your Profile
            </a>
            <a href="#" className="text-decoration-none d-block">
              Transfer and Conversion of Shares
            </a>
          </div>
        </div>

        {/* Column 3 */}
        <div className="col-md-4">
          <h4 className="mt-5">
            <i className="fa-solid fa-circle-plus me-2"></i>
            Trading & Platforms
          </h4>

          <div style={{ lineHeight: "2.5" }}>
            <a href="#" className="text-decoration-none d-block">
              Margin, Leverage, Product & Order Types
            </a>
            <a href="#" className="text-decoration-none d-block">
              Kite Web & Mobile
            </a>
            <a href="#" className="text-decoration-none d-block">
              Trading FAQs
            </a>
            <a href="#" className="text-decoration-none d-block">
              Corporate Actions
            </a>
            <a href="#" className="text-decoration-none d-block">
              Sentinel
            </a>
            <a href="#" className="text-decoration-none d-block">
              Kite API
            </a>
            <a href="#" className="text-decoration-none d-block">
              GTT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
