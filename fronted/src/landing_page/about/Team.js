import React from "react";

function Team() {
  // Define the style object here to fix the 'linkStyle' is not defined error
  const linkStyle = {
    color: "#387ed1",
    textDecoration: "none",
    fontWeight: "500",
    marginLeft: "5px"
  };

  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">People</h1>
      </div>
      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="stock tradingpic/dhiraj.jpg"
            alt="Dhiraj Gupta"
            style={{ width: "250px", height: "auto", borderRadius: "100%" }}
          />
          <h4 className="mt-3">Dhiraj Gupta</h4>
          <p style={{ fontSize: "0.9em", color: "#999" }}>B.Tech CSE (6th Sem)</p>
        </div>
        <div className="col-6 p-3">
          <p>
            I am a 6th-semester B.Tech Computer Science student building full-stack applications with a focus on the MERN stack. 
            I built this Kite clone to deconstruct the complexities of real-world fintech platforms.
          </p>

          <p>
            Through this build, I didn't just learn to code; <strong>I learned to architect.</strong> I mastered the art of managing 
            complex data flows, ensuring that every user action reflects instantly across the dashboard through synchronized 
            state management.
          </p>

          <p>
            I also gained deep experience in connecting React frontends to live MongoDB databases via Express APIs, 
            handling everything from <strong>asynchronous data fetching</strong> to <strong>complex financial calculations</strong> 
            like real-time P&L and portfolio totals.
          </p>

          <div className="social-links" style={{ marginTop: "30px" }}>
            Connect on: 
            <a href="https://www.linkedin.com/in/dhiraj-gupta-aa813a28b/" style={linkStyle}> LinkedIn</a> / 
            <a href="https://github.com/codebydhiraj144" style={linkStyle}> GitHub</a> / 
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;