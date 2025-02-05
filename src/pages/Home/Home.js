import React, { useEffect, useRef } from "react";

import ExploreLotteryCareds from "../../components/ExpoloreLotteryCards/ExploreLotteryCareds";
import HeroSection from "../../components/HeroSection/HeroSection";
import { getProgram } from "../../lib/sol-program";

const Home = () => {
  const myRef = useRef(null);

  useEffect(() => {
    const program = getProgram();
    program.account.lotteryState.all().then(lotteries => console.log(lotteries))
  }, [])

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
