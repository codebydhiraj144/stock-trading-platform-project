import React from 'react';

function Education() {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6'>
                    <img src='stock tradingpic/education.svg' style={{ width: "70%" }} alt="Education SVG" />
                </div>
                <div className='col-6'>
                    <h1 className='mb-3 fs-2'>Free and open market education</h1>
                    
                    {/* Pehla block: Varsity */}
                    <div>
                        <p>
                            Varsity, the largest online stock market education book in the world<br />
                            covering everything from the basics to advanced trading.
                        </p>
                        <a href="#" style={{ textDecoration: "none" }}>
                            Varsity <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>

                    {/* Dusra block: TradingQ&A */}
                    <div className='mt-5'>
                        <p>
                            TradingQ&A, the most active trading and investment community in<br />
                            India for all your market related queries.
                        </p>
                        <a href="#" style={{ textDecoration: "none" }}>
                            TradingQ&A <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Education;