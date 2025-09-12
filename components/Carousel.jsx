"use client"
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { absoluteUrl } from "@/lib/utils";
import { Carousel } from 'flowbite-react';
import { StaticBLurDataUrl } from "@/utils/staticBlurDataUrl";

const ImgCarousel = ({ ...props }) => { 
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialZoom, setInitialZoom] = useState(1);

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const customTheme = {
    control: {
      base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#497EDA] group-hover:bg-blue-700 group-focus:outline-none group-focus:ring-4 group-focus:ring-blue-300 dark:bg-blue-500 dark:group-hover:bg-blue-600 dark:group-focus:ring-blue-800 sm:h-10 sm:w-10",
      icon: "h-5 w-5 text-white dark:text-white sm:h-6 sm:w-6"
    }
  };

  const openZoomModal = useCallback((image) => {
    setSelectedImage(image);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, []);

  const closeZoomModal = useCallback(() => {
    setSelectedImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, []);

  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  }, []);

  const getDistance = useCallback((touch1, touch2) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  // Limitar movimiento según tamaño de imagen y contenedor
  const limitPosition = useCallback((x, y) => {
    if (!containerRef.current || !imageRef.current) return { x, y };

    const container = containerRef.current;
    const img = imageRef.current;

    const containerRect = container.getBoundingClientRect();
    const imgWidth = img.naturalWidth * zoomLevel;
    const imgHeight = img.naturalHeight * zoomLevel;

    const maxX = Math.max((imgWidth - containerRect.width) / 2, 0);
    const maxY = Math.max((imgHeight - containerRect.height) / 2, 0);

    return {
      x: Math.min(Math.max(x, -maxX), maxX),
      y: Math.min(Math.max(y, -maxY), maxY),
    };
  }, [zoomLevel]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
  }, [imagePosition]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const pos = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    };

    setImagePosition(limitPosition(pos.x, pos.y));
  }, [isDragging, dragStart, limitPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY;

    if (delta > 0) setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
    else setZoomLevel(prev => Math.min(prev + 0.1, 3));
  }, []);

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    const touches = e.touches;

    if (touches.length === 1) {
      setIsDragging(true);
      setTouchStart({
        x: touches[0].clientX - imagePosition.x,
        y: touches[0].clientY - imagePosition.y
      });
    } else if (touches.length === 2) {
      setIsDragging(false);
      setInitialDistance(getDistance(touches[0], touches[1]));
      setInitialZoom(zoomLevel);
    }
  }, [imagePosition, getDistance, zoomLevel]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const touches = e.touches;

    if (touches.length === 1 && isDragging && touchStart) {
      setImagePosition(limitPosition(
        touches[0].clientX - touchStart.x,
        touches[0].clientY - touchStart.y
      ));
    } else if (touches.length === 2 && initialDistance > 0) {
      const distance = getDistance(touches[0], touches[1]);
      const scale = distance / initialDistance;
      const newZoom = Math.min(Math.max(initialZoom * scale, 0.5), 3);
      setZoomLevel(newZoom);
    }
  }, [isDragging, touchStart, initialDistance, initialZoom, getDistance, limitPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTouchStart(null);
    setInitialDistance(0);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (selectedImage) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') closeZoomModal();
    };

    if (selectedImage) document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, closeZoomModal]);

  return (
    <>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-unit-96 w-[100%] m-auto">
        <Carousel slide={false} theme={customTheme}>
          {props.images.map((image, key) => (
            <div key={key} className="relative w-full h-full">
              <Image
                src={absoluteUrl(image.uri.url)}
                alt={image.resourceIdObjMeta.alt}
                fill
                className="rounded-2xl object-contain duration-500 cursor-pointer hover:opacity-90 transition-opacity"
                placeholder="blur"
                blurDataURL={StaticBLurDataUrl()}
                onClick={() => openZoomModal(image)}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-80" onClick={closeZoomModal} />

          <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button onClick={zoomOut} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full backdrop-blur-sm" title="Zoom Out">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
              </button>
              <button onClick={zoomIn} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full backdrop-blur-sm" title="Zoom In">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </button>
              <button onClick={closeZoomModal} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full backdrop-blur-sm" title="Cerrar">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="absolute top-4 left-4 z-20 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
              {Math.round(zoomLevel * 100)}%
            </div>

            <div
              ref={containerRef}
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              style={{ touchAction: 'none', userSelect: 'none' }}
            >
              <Image
                ref={imageRef}
                src={absoluteUrl(selectedImage.uri.url)}
                alt={selectedImage.resourceIdObjMeta.alt}
                width={800}
                height={600}
                className="max-w-none select-none cursor-grab active:cursor-grabbing"
                style={{
                  transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoomLevel})`,
                  touchAction: 'none',
                  willChange: 'transform'
                }}
                onMouseDown={handleMouseDown}
                onDragStart={(e) => e.preventDefault()}
                placeholder="blur"
                blurDataURL={StaticBLurDataUrl()}
              />
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-white bg-opacity-20 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm text-center">
              <span className="hidden sm:inline">Arrastra para mover • Scroll para zoom • ESC para cerrar</span>
              <span className="sm:hidden">Arrastra para mover • Pellizca para zoom • Toca para cerrar</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImgCarousel;
