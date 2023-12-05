import React, { useRef } from "react";

import ExploreLotteryCareds from "../../components/ExpoloreLotteryCards/ExploreLotteryCareds";
import HeroSection from "../../components/HeroSection/HeroSection";

const Home = () => {
  const myRef = useRef(null);

  return (
    <>
      <HeroSection myRef={myRef} />
      <div ref={myRef}>
        <ExploreLotteryCareds />
      </div>
    </>
  );
};

export default Home;
