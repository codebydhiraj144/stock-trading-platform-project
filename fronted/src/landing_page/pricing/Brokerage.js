import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 text-center border-top">
        
        <div className="col-8 p-4 ">
          <a href="#" className="text-decoration-none">
            <h3 className="fs-5">Brokerage calculator</h3>
            </a>
            <ul style={{textAlign:"left", lineHeight:"1.8"}} className="text-muted">
              <li>call & Trade and RMS auto-squareoff: Additional charges of ₹50 + GST per order </li>
              <li>Digital contact notes will be sent via e-mail</li>
              <li>physical copies of contact notes, if required, shall be charged  ₹20 per contacts note courier charges apply</li>
              <li> For NRI (non-PSI),0.5% or ₹100 per executed oeder foe equity(whichever is lower)</li>
              <li> For NRI account (PSI) or ₹200 per executed order for equity(whichever is lower)</li>
            </ul>
          
        </div>

        <div className="col-4 p-4">
          <a href="#" className="text-decoration-none">
            <h3 className="fs-5">List of charges</h3>
          </a>
        </div>

      </div>
    </div>
  );
}

export default Brokerage;
