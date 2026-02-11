// Universe.js
import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment even further with our partner platforms.
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="stock tradingpic/smallcaseLogo.png" alt="smallcase" />
          <p className="text-muted mt-4">Thematic investment platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="stock tradingpic/streakLogo.png" alt="smallcase" style={{width:"200px"}} />
          <p className="text-muted mt-4"> Algo & stategy platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="stock tradingpic/sensibullLogo.svg" alt="smallcase" style={{width:"200px"}} />
          <p className="text-muted mt-4">options trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="stock tradingpic/zerodhaFundhouse.png" alt="smallcase" style={{width:"200px"}}/>
          <p className="text-muted mt-4">Asset management</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="stock tradingpic/goldenpiLogo.png" alt="smallcase" style={{width:"200px"}} />
          <p className="text-muted mt-4">Bonds trading platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="stock tradingpic/dittoLogo.png" alt="smallcase" style={{width:"100px"}} />
          <p className="text-muted mt-4">Insurance</p>
        </div>
         <button className='p-2 btn btn-primary fs-5 mb-5' style={{  width:"20%",margin:"0 auto" }}>Signup</button>
      </div>
    </div>
  );
}

export default Universe;
