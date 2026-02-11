import React from "react";

function Hero() {
  return (
    <div className="container border-bottom mb-5">
      <div className="text-center mt-5">
      <h1>Technology</h1>
      <h3 className="text-muted mt-3 fs-4">Sleek, modern and intuitive trading platforms</h3>
      <p className="mt-3 mb-5">
        Check out our
        <a href="" className="mx-2" style={{ textDecoration: "none" }}>
          investment offerings
        </a>
        <i className="fa-solid fa-arrow-right ms-2" aria-hidden="true"></i>
      </p>
    </div>
    </div>
  );
}

export default Hero;
