import React from "react";
import AboutUs from "../../components/AboutUs/AboutUs";

import ExploreLotteryCareds from "../../components/ExpoloreLotteryCards/ExploreLotteryCareds";
import HeroSection from "../../components/HeroSection/HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <ExploreLotteryCareds />
    </>
  );
};

export default Home;
