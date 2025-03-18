"use client";
import { Navigation, Pagination, EffectCoverflow } from "swiper";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Slider = () => {
  const imgSrc = "/images/slider";

  return (
    <div className="mt-12">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="py-24 lg:py-48"
      >
        <SwiperSlide>
          {({ isActive }) => (
            <Image
              src={`${imgSrc}/2.webp`}
              alt="slide_image"
              width={470}
              height={790}
              className={`${
                isActive && "scale-125"
              } duration-1000 max-h-[50vh]`}
            />
          )}
        </SwiperSlide>{" "}
        <SwiperSlide>
          {({ isActive }) => (
            <Image
              src={`${imgSrc}/1.webp`}
              alt="slide_image"
              width={470}
              height={790}
              className={` ${
                isActive && "scale-125"
              } duration-1000 max-h-[50vh]`}
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <Image
              src={`${imgSrc}/3.webp`}
              alt="slide_image"
              width={470}
              height={790}
              className={` ${
                isActive && "scale-125"
              } duration-1000 max-h-[50vh]`}
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <Image
              src={`${imgSrc}/4.webp`}
              alt="slide_image"
              width={470}
              height={790}
              className={`${
                isActive && "scale-125"
              } duration-1000 max-h-[50vh]`}
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <Image
              src={`${imgSrc}/5.webp`}
              alt="slide_image"
              width={470}
              height={790}
              className={`${
                isActive && "scale-125"
              } duration-1000 max-h-[50vh]`}
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <Image
              src={`${imgSrc}/6.webp`}
              alt="slide_image"
              width={470}
              height={790}
              className={`${
                isActive && "scale-125"
              } duration-1000 max-h-[50vh]`}
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <Image
              src={`${imgSrc}/7.webp`}
              alt="slide_image"
              width={470}
              height={790}
              className={`${
                isActive && "scale-125"
              } duration-1000 max-h-[50vh]`}
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <Image
              src={`${imgSrc}/8.webp`}
              alt="slide_image"
              width={470}
              height={790}
              className={`${
                isActive && "scale-125"
              } duration-1000 max-h-[50vh]`}
            />
          )}
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow text-white text-2xl font-bold">
            <BsChevronLeft />
          </div>
          <div className="swiper-button-next slider-arrow text-white text-2xl font-bold">
            <BsChevronRight />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};
export default Slider;
