"use client";
import { useState, useEffect } from "react";
import Image_Damper from "../Image_Damper";
import Information from "./Information";

const Book_Form = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageList =
    props.img && typeof props.img === "object"
      ? Object.values(props.img)
      : typeof props.img === "string"
        ? [props.img]
        : [];

  useEffect(() => {
    if (imageList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageList.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [imageList.length]);

  return (
    <>
      <form className="flex w-full px-6 gap-4 h-[60vh]">
        <div className="w-[30%] h-full overflow-hidden relative rounded-xl shadow-lg">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {imageList.map((url, index) => (
              <div key={index} className="w-full h-full flex-shrink-0">
                <Image_Damper name={`Trip Image ${index + 1}`} img={url} />
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-[10]">
            {imageList.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="w-[70%] h-full flex justify-center">
          <Information
            tripData={props.tripData} // Kabel data tersambung
            desc={props.desc}
            days={props.days}
            slot={props.slot}
            svg={props.svg}
            map={props.map}
            price={props.price}
          />
        </div>
      </form>
    </>
  );
};

export default Book_Form;