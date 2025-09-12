"use client"
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image"
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

  // Tema personalizado para cambiar el color de los controles de navegación
  const customTheme = {
    control: {
      base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#497EDA] group-hover:bg-blue-700 group-focus:outline-none group-focus:ring-4 group-focus:ring-blue-300 dark:bg-blue-500 dark:group-hover:bg-blue-600 dark:group-focus:ring-blue-800 sm:h-10 sm:w-10",
      icon: "h-5 w-5 text-white dark:text-white sm:h-6 sm:w-6"
    }
  };

  // Función para abrir el modal con zoom
  const openZoomModal = useCallback((image) => {
    setSelectedImage(image);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, []);

  // Función para cerrar el modal
  const closeZoomModal = useCallback(() => {
    setSelectedImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, []);

  // Funciones para controlar el zoom
  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  }, []);

  // Funciones auxiliares
  const getDistance = useCallback((touch1, touch2) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  // Handlers de mouse - usando useCallback
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
  }, [imagePosition]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    setImagePosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handler de wheel (scroll) para zoom en desktop
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY;
    
    if (delta > 0) {
      // Scroll hacia abajo - zoom out
      setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
    } else {
      // Scroll hacia arriba - zoom in
      setZoomLevel(prev => Math.min(prev + 0.1, 3));
    }
  }, []);

  // Handlers de touch - usando useCallback
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
      const distance = getDistance(touches[0], touches[1]);
      setInitialDistance(distance);
      setInitialZoom(zoomLevel);
    }
  }, [imagePosition, getDistance, zoomLevel]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const touches = e.touches;
    
    if (touches.length === 1 && isDragging && touchStart) {
      setImagePosition({
        x: touches[0].clientX - touchStart.x,
        y: touches[0].clientY - touchStart.y
      });
    } else if (touches.length === 2 && initialDistance > 0) {
      const distance = getDistance(touches[0], touches[1]);
      const scale = distance / initialDistance;
      const newZoom = Math.min(Math.max(initialZoom * scale, 0.5), 3);
      setZoomLevel(newZoom);
    }
  }, [isDragging, touchStart, initialDistance, initialZoom, getDistance]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTouchStart(null);
    setInitialDistance(0);
  }, []);

  // Effect para eventos de mouse globales
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

  // Effect para bloquear scroll de la página cuando el modal está abierto
  useEffect(() => {
    if (selectedImage) {
      // Guardar posición actual de scroll
      const scrollY = window.scrollY;
      
      // Bloquear scroll del body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restaurar scroll del body al cerrar
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        
        // Restaurar posición de scroll
        window.scrollTo(0, scrollY);
      };
    }
  }, [selectedImage]);

  // Cerrar modal con Escape
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        closeZoomModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedImage, closeZoomModal]);

  return (
    <>
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
                className="rounded-2xl object-contain duration-500 cursor-pointer hover:opacity-90 transition-opacity"
                placeholder="blur"
                blurDataURL={StaticBLurDataUrl()}
                onClick={() => openZoomModal(image)}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Modal de Zoom */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-80"
            onClick={closeZoomModal}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
            {/* Controles de zoom */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button
                onClick={zoomOut}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm touch-manipulation"
                title="Zoom Out"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <button
                onClick={zoomIn}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm touch-manipulation"
                title="Zoom In"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              
              <button
                onClick={closeZoomModal}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm touch-manipulation"
                title="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Indicador de zoom */}
            <div className="absolute top-4 left-4 z-20 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
              {Math.round(zoomLevel * 100)}%
            </div>

            {/* Imagen con zoom */}
            <div 
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              style={{ 
                touchAction: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <Image
                src={absoluteUrl(selectedImage.uri.url)}
                alt={selectedImage.resourceIdObjMeta.alt}
                width={800}
                height={600}
                className="max-w-none select-none"
                style={{
                  transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                  touchAction: 'none',
                  pointerEvents: 'none',
                  willChange: 'transform'
                }}
                onMouseDown={handleMouseDown}
                onDragStart={(e) => e.preventDefault()}
                placeholder="blur"
                blurDataURL={StaticBLurDataUrl()}
              />
            </div>

            {/* Instrucciones */}
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
