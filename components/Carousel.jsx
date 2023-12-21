import Image from "next/image";
import styles from "./catalogue/Catalogue.module.css";
import { absoluteUrl } from "../lib/utils";
import { useState } from "react";
export default function Carousel({ images }) {
  let [current, setCurrent] = useState(0);

  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {
    images.map((image, key)=> (
        <Image
        key={key}
        src={absoluteUrl(image.uri.url)}
        alt={image.resourceIdObjMeta.alt}
        width="7000"
        height="7000"
        className={`mx-auto w-80 md:w-auto rounded-xl ${styles.product_image}`}
      />
    ))
}
      </div>

      <div className="bottom-0 py-4 flex justify-center gap-3 w-full">
        {images.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer  ${
                i == current ? "bg-currentCarousel" : "bg-notCurrentCarousel"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}










