"use client";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { set_modals } from "@/redux/slices/modalsopen";

export default function ProjectImages({
  service,
  currentIndex,
  setCurrentIndex,
  setImageOpen,
  isImageOpen,
}: {
  service: any;
  currentIndex: number;
  setCurrentIndex: Function;
  setImageOpen: Function;
  isImageOpen: boolean;
}) {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchEnd = () => {
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 50) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  function handleNext() {
    setCurrentIndex(
      currentIndex + 1 === service.images.length ? 0 : currentIndex + 1
    );
  }

  function handlePrev() {
    setCurrentIndex(
      currentIndex === 0 ? service.images.length - 1 : currentIndex - 1
    );
  }

  const { modals } = useSelector((state: any) => state.modals);
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed left-0 top-0 ${
        isImageOpen ? "block" : "hidden"
      } z-[9999]`}
    >
      <div
        onClick={() => {
          setImageOpen(false);
          dispatch(set_modals({ ...modals, isProjectOpen: false }));
        }}
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75"
      >
        <button
          onClick={() => {
            setImageOpen(false);
            dispatch(set_modals({ ...modals, isProjectOpen: false }));
          }}
          className="absolute top-6 right-6 text-white text-2xl"
        >
          ✕
        </button>
        <div
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          className="fixed flex flex-col items-center justify-center top-1/2 -translate-y-1/2 mx-auto p-4"
        >
          <div className="flex justify-center relative h-[50%] w-auto group">
            {service.images.map((image: any, i: number) => (
              <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className={`w-full mx-auto bg-black/50 ${
                  i === 0 ? "top-16" : "left-0 top-0 absolute"
                } ${
                  currentIndex === i
                    ? "opacity-100 duration-150"
                    : "opacity-0 duration-150"
                } `}
                key={i}
              >
                <div className="relative">
                  <Image
                    src={image.src}
                    width={1024}
                    height={1024}
                    alt={"Obraz usługi"}
                    className="min-h-[500px] max-h-[600px] w-auto mx-auto"
                    draggable="false"
                  />
                  <div className="absolute left-16 top-2 font-bold text-white max-w-full">
                    {image.desc}
                  </div>
                  <div className="w-max mx-auto absolute left-0 -top-7 bg-gradient-to-r from-primaryHoverStart to-primaryHoverEnd text-white">
                    {currentIndex + 1} / {service.images.length}
                  </div>
                  <button
                    onClick={() => handlePrev()}
                    className="z-[101] opacity-0 sm:opacity-100 bg-gradient-to-r from-primaryHoverStart to-primaryHoverEnd hover:from-primaryHoverStart/80 hover:to-primaryHoverEnd/80 text-white text-lg p-3 absolute left-0 top-1/2 -translate-y-1/2 bg-black/30"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => handleNext()}
                    className="z-[101] opacity-0 sm:opacity-100 bg-gradient-to-r from-primaryHoverStart to-primaryHoverEnd hover:from-primaryHoverStart/80 hover:to-primaryHoverEnd/80 text-white text-lg p-3 absolute right-0 top-1/2 -translate-y-1/2 bg-black/30"
                  >
                    <FaChevronRight />
                  </button>
                  {service.images && (
                    <div className="z-50 w-full absolute bottom-0 left-1/2 -translate-x-1/2 max-w-full overflow-x-auto whitespace-nowrap space-x-2 pt-2 group-hover:bg-black/50 bg-transparent duration-200 px-3 scrollbar">
                      {service.images.map((image: any, i: number) => (
                        <button
                          onClick={() => setCurrentIndex(i)}
                          key={i}
                          className={`relative h-[50px] w-auto border-2 ${
                            currentIndex === i
                              ? "border-white"
                              : "border-transparent"
                          }`}
                        >
                          <Image
                            src={image.src}
                            width={300}
                            height={300}
                            alt={"Obraz usługi"}
                            className="h-full w-auto"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
