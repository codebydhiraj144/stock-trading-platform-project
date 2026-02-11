import React from "react";
import Hero from "./Hero";
import Leftimage from "./Leftimage";
import Rightimage from "./Rightimage";
import Universe from "./Universe";

function ProductPage() {
  return (
    <>
      <Hero />

      <Leftimage
        imageUrl="stock tradingpic/kite.png"
        productName="Kite"
        productDescription="Our fast and intuitive trading platform."
        tryDemo="/kite-demo"
        learnMore="/kite"
        googlePlay="https://play.google.com"
        appStore="https://apple.com"
      />

      <Rightimage
      imageUrl="stock tradingpic/console.png"
        productName="Console"
        productDescription="The central dashboard for your zerodha account. Gain insights into your trades and investments
        with in-depth reports and visualisations."
        
        learnMore=""
         />

      <Leftimage
        imageUrl="stock tradingpic/coin.png"
        productName="Coin"
        productDescription={`Buy direct mutual funds online, commission-free,
        delivered directly to your Demat account.
        Enjoy the investment experience on your Android and iOS devices.`}
        tryDemo="/coin-demo"
        learnMore="/coin"
        googlePlay="https://play.google.com"
        appStore="https://apple.com"
      />

      <Rightimage 
      imageUrl="stock tradingpic/kiteconnect.png"
        productName="Kite Connect API"
        productDescription="Build powersful trading platforms and experiences with our super simple
        HTTP/JSON APIS. if you are a startup, build your investment app and showcase it to our clientbase"
        
        learnMore="/"
        />

      <Leftimage
        imageUrl="stock tradingpic/varsity.png"
        productName="Varsity Mobile"
        productDescription="An easy-to-grasp collection of stock market lessons
        with in-depth coverage and illustrations.
        Content is broken into bite-size cards to help you learn on the go."
        tryDemo="/varsity-demo"
        learnMore="/varsity"
        googlePlay="https://play.google.com"
        appStore="https://apple.com"
      />

      <p className="text-center mt-5 mb-5">
        Want to know more about our technology stack? Check ouut the Zerodha.tech
        blog
      </p>

      <Universe />
    </>
  );
}

export default ProductPage;
