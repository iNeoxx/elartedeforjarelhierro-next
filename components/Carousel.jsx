"use client"
import React, { useState } from "react";
import Image from "next/image"
import { absoluteUrl } from "@/lib/utils";

const Carousel = ({ ...props }) => {
  const images = props.images;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }
  const nextSlide = () => {
    const isLastSlide = currentIndex == images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

  return (
    <div className="max-w-[1400px] w-full m-auto py-6 px-4 relative">
      <div className="w-full rounded-2xl bg-center bg-cover duration-500">
        <Image
          src={absoluteUrl(images[currentIndex].uri.url)}
          width={700}
          height={700}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        />
      </div>
      {/* flecha izquierda */}
      <div onClick={prevSlide} className="absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="48" viewBox="0 0 30 48" fill="none">
          <path d="M29.64 42.36L11.32 24L29.64 5.64L24 0L0 24L24 48L29.64 42.36Z" fill="#0866FF" />
        </svg>
      </div>

      {/* flecha derecha */}
      <div onClick={nextSlide} className="absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="48" viewBox="0 0 30 48" fill="none">
          <path d="M0 42.36L18.32 24L0 5.64L5.64 0L29.64 24L5.64 48L0 42.36Z" fill="#0866FF" />
        </svg>
      </div>
      {/* DOTS */}
      <div className="flex top-4 justify-center py-6 gap-5">
        {
          images.map((image, imageIndex) => (
            <div key={imageIndex} onClick={() => goToSlide(imageIndex)} className="text-2xl cursor-pointer">
              {
                imageIndex == currentIndex ? (<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <circle cx="8.5" cy="8.5" r="8" fill="#0866FF" />
                </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <circle cx="8.5" cy="8.5" r="8" fill="#C4C4C4" />
                </svg>)
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Carousel;