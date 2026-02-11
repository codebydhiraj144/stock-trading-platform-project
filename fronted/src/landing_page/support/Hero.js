import React from "react";

function Hero() {
  return (
    <section className="container-fluid " id="supportHero">
      <div className=" p-5" id="supportTitle">
        <h3>Support portal</h3>
        <a href="">Track Tickets</a>
        
      </div>
      <div className=" row p-3 m-3" >
        <div className=" col-6 p-5  " >
          <h1 className="fs-3">Search for an answer or browse help topics to create a ticket</h1>
          <input placeholder="Eg. how do i activate F&O"/><br></br>
          <a href="" className="mt-2">Track account opening</a>
          <a href="" className="mt-2">Track segment activation</a>
          <a href="">Intraday margins</a>
          <a href="">kite user manual</a>
        </div>
        <div className=" col-6 p-5" >
          <h1 className="fs-3">Featured</h1>
          <ol>
            
            <li>
               <a href="">Current Takeover and Delisting - january 2024</a>
            </li>
            <li>
               <a href="">Latest Intraday Leverage-MIS & CO</a>
            </li>
          </ol>
         
         
        </div>
       
        
      </div>
    </section>
  )
}

export default Hero;
