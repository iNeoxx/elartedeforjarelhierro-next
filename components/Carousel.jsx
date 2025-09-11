"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image"
import { absoluteUrl } from "@/lib/utils";
import { Carousel } from 'flowbite-react';
import { StaticBLurDataUrl } from "@/utils/staticBlurDataUrl";

const ImgCarousel = ({ ...props }) => { 

  // Tema personalizado para cambiar el color de los controles de navegación
  const customTheme = {
    control: {
      base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#497EDA] group-hover:bg-blue-700 group-focus:outline-none group-focus:ring-4 group-focus:ring-blue-300 dark:bg-blue-500 dark:group-hover:bg-blue-600 dark:group-focus:ring-blue-800 sm:h-10 sm:w-10",
      icon: "h-5 w-5 text-white dark:text-white sm:h-6 sm:w-6"
    }
  };

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-unit-96 w-[100%] m-auto">
      <Carousel 
        slide={false}
        theme={customTheme}
      >
        {props.images.map((image, key) => (
          <div key={key} className="relative w-full h-full">
            <Image
              src={absoluteUrl(image.uri.url)}
              alt={image.resourceIdObjMeta.alt}
              fill
              className="rounded-2xl object-contain duration-500"
              placeholder="blur"
              blurDataURL={StaticBLurDataUrl()}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImgCarousel;
