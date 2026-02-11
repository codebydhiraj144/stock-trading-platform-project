import React from "react";

const Funds = () => {
  return (
    <div className="funds-container">
      {/* Header with Info and Buttons */}
      <div className="funds-header">
        <p className="text-muted">Instant, Zero-cost fund transfers with UPI</p>
        <div className="actions">
          <button className="btn btn-green">Add funds</button>
          <button className="btn btn-blue">Withdraw</button>
        </div>
      </div>

      <div className="funds-content">
        <div className="equity-section">
          <div className="section-title">
            <span>Equity</span>
          </div>
          
          <div className="fund-details">
            {/* Main Values */}
            <div className="detail-row">
              <span>Available margin</span>
              <span className="bold-value">₹ 0.00</span>
            </div>
            <div className="detail-row">
              <span>Used margin</span>
              <span className="bold-value">₹ 0.00</span>
            </div>
            <div className="detail-row total">
              <span>Available cash</span>
              <span className="bold-value blue">₹ 0.00</span>
            </div>
            
            <hr className="divider" />
            
            {/* Breakout Values */}
            <div className="detail-row secondary">
              <span>Opening balance</span>
              <span>0.00</span>
            </div>
            <div className="detail-row secondary">
              <span>Payin</span>
              <span>0.00</span>
            </div>
            <div className="detail-row secondary">
              <span>Payout</span>
              <span>0.00</span>
            </div>
          </div>
        </div>

        {/* Commodity Section Placeholder */}
        <div className="commodity-section">
           <div className="section-title">
            <span>Commodity</span>
          </div>
          <p className="text-muted">You don't have a commodity account</p>
          <button className="btn-link">Activate account</button>
        </div>
      </div>
    </div>
  );
};

export default Funds;