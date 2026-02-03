"use client"; // 👈 Indispensable para usar hooks en el App Router

import { useRouter } from 'next/navigation'; // 👈 Cambiado de next/router a next/navigation

interface BackButtonProps {
  text: string;
  [key: string]: any; 
}

const BackButton = ({ text, ...props }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`
        group flex gap-2 items-center justify-center
        px-4 py-2 bg-blue-600 hover:bg-blue-700 
        text-white font-medium rounded-xl 
        transition-all duration-250 active:scale-95
        shadow-md hover:shadow-lg w-full
        ${props.className || ""} 
      `}
      {...props}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" height="18" viewBox="0 0 30 40" 
        fill="none"
        className="transition-transform group-hover:-translate-x-1"
      >
        <path 
          d="M29.64 38.36L11.32 20L29.64 1.64L24 -4L0 20L24 44L29.64 38.36Z" 
          fill="currentColor" 
        />
      </svg>
      <span className="lg:text-xl">{text}</span>
    </button>
  );
};

export default BackButton;