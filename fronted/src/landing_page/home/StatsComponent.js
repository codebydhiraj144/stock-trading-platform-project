import React from 'react';

function StatsComponent(){
    return (
        <div className='container p-5'>
          <div className='row p-3'>
            <div className='col-6 p-5'>
                <h1 className='fs-2 mb-5'>Trust with confidence</h1> 
                <h2 className='fs-4'>Customer-first always</h2>
                <p className='text-muted'>That's why core customer trust zerodha with ₹3.5+ <br/>
                    lakh orores worth of equity investments.
                </p > 
                <h2  className='fs-4'>NoSpam or gimmicks</h2>
                <p className='text-muted'>no gimmicks, spam,"gamification",or annoying push <br></br>notifications. High quality apps that you use at your pace, the <br></br> way you like.
                </p> 
                <h2  className='fs-4'>Ther Zerodha Universe</h2>
                <p className='text-muted'>Not just an app, but a whole ecosystem.our investments in <br></br> 
                30+ fintech startups offer you tailored services specific to <br></br>
                your needs.
                </p> 
                <h2  className='fs-4'>Do better with money</h2>
                <p className='text-muted'> with inititatives like Nudge and kill Switch , we dont just <br></br> faciliate transitions, but actively help you do better with <br></br>
                 your money.
                </p>
            </div>
             <div className='col-6 p-5'>
                <img src='stock tradingpic/ecosystem.png' style={{width:"85%"}}/>
                <div  className='text-center'>
                    <a href='' className='mx-5' style={{textDecoration:"none"}}>Explore our products <i class="fa-solid fa-arrow-right"></i></a>
                    <a href='' >Try kite demo</a>
                </div>
             </div>
          </div>
        </div>




    );
}

export default StatsComponent;