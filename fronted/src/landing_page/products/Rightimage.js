import React from "react";

function Rightimage({ imageUrl, productName, productDescription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row">
        
        {/* Text first */}
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
          <a href={learnMore}>Learn more</a>
        </div>
         </div>

        {/* Image on right */}
        <div className="col-6 p-5">
          <img src={imageUrl}  />
        </div>

      </div>
    </div>
  );
}

export default Rightimage;
