// Leftimage.js
import React from "react";

function Leftimage({imageUrl, productName, productDescription, tryDemo, learnMore, googlePlay, appStore}) {
  return(
<div className="container">
  <div className="row">
    <div className="col-6 p-5 ">
      <img src={imageUrl}/>
    </div>
    <div className="col-6 p-5 mt-5">
    <h1>{productName}</h1>
    <p>{productDescription}</p>
    <div >
 <a href={tryDemo}>Try Demo</a>
    <a href={learnMore} style={{marginLeft:"50px"}}>Learn more</a>
    </div>
   <div className="mt-3">
<a href={googlePlay}>
  <img src="stock tradingpic/googlePlayBadge.svg"/>
  </a>
      <a href={appStore}> 
        <img src="stock tradingpic/appstoreBadge.svg"  style={{marginLeft:"50px"}}/></a>
   </div>
     
    </div>
  </div>
</div>
  )
}

export default Leftimage;
