import React from 'react';

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row align-items-start">
        <div className="col-6 p-3">
<img src='stock tradingpic/largestBroker.svg' className='img-fluid' alt='largest broker'/>
        </div>
        <div className="col-6 p-3 mt-3">
         <h1>Largest stock broker in India</h1>
         <p className='mb-5'>
            2+million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
         </p>
          <div className='row'>
            <div className='col-6'>
                <ul>
            <li>
                <p>Future and Options</p>
            </li>
             <li>
                <p>Commodity derivatives</p>
            </li>
             <li>
                <p>Currency derivatives</p>
            </li>
            
         </ul>

            </div>
            <div className='col-6'><ul>
            <li>
                <p>stocks & IPOs</p>
            </li>
             <li>
                <p>Direct mutual funds</p>
            </li>
             <li>
                <p>Bonds and Government security</p>
            </li>
            
         </ul>
</div>
          </div>
           <img src='stock tradingpic/pressLogos.png' 
           className='img-fluid mt-3'
           style={{width:"89%"}}/>
           
         

        </div> 
      </div>
    </div>
  );
}

export default Awards;
