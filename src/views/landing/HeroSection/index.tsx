import React from "react";
import { IntroTitle, IntroWrapper } from "./intro.styled";
import Slider from "./Slider";

const IntroPart = () => {
  return (
    <>
      <IntroWrapper>
        <IntroTitle className="lg:mt-0">
          <p className="text-[#8f26f3] italic !text-3xl sm:!text-4xl mg:!text-5xl lg:!text-7xl xl:text-8xl font-coco">
            razem tworzymy piękno
          </p>
          <p className="text-white italic !text-3xl sm:!text-4xl mg:!text-5xl lg:!text-7xl xl:text-8xl font-coco">
            sztuka i tatuaże
          </p>
        </IntroTitle>
        <Slider />
      </IntroWrapper>
      <div className="bg-hero-svg w-full fixed left-0 top-[10vh] h-full bg-no-repeat z-[-1] opacity-40"></div>
    </>
  );
};

export default IntroPart;
