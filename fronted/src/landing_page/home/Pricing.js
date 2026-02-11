import React from "react";

function Pricing() {
  return (
    <div className="container mb-5">
      <div className="row align-items-start">

        {/* LEFT SIDE – TEXT */}
        <div className="col-md-5">
          <h2 fs-2>Unbeatable pricing</h2>
          <p>
            We pioneered the concept of discount broking and price<br></br>
            transparency in India. Flat fees and no hidden charges.
          </p>
          <a href="#" style={{ textDecoration: "none" }}>
            See pricing <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        {/* GAP */}
        <div className="col-1"></div>

        {/* RIGHT SIDE – PRICING */}
        <div className="col-md-6 mb-5">
          <div className="row text-center">
            <div className="col border">
              <h1>₹0</h1>
              <p>Free equity delivery and direct mutual funds</p>
            </div>

            <div className="col border">
              <h1>₹20</h1>
              <p>Intraday and F&O</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Pricing;
