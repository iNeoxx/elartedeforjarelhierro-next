"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image"
import { absoluteUrl } from "@/lib/utils";
import { Carousel } from 'flowbite-react';

const ImgCarousel = ({ ...props }) => { 

  return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-unit-96 w-[100%] m-auto">
      <Carousel slide={false}>
      {
        props.images.map((image, key)=> (
          <Image
          key={key}
          src={absoluteUrl(image.uri.url)}
          alt={image.resourceIdObjMeta.alt}
          width={700}
          height={700}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
          />
        ))
      }
      </Carousel>
    </div>
     
  );
}

export default ImgCarousel;
{/* {
        props.images.map((image)=> (
          <Image
          src={absoluteUrl(image.uri.url)}
          alt={image.resourceIdObjMeta.alt}
          width={700}
          height={700}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
          />
        ))
      } */}