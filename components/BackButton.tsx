"use client"

import type { ButtonHTMLAttributes } from "react"
import { useRouter } from "next/navigation"

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

const BackButton = ({
  text,
  className = "",
  onClick,
  ...props
}: BackButtonProps) => {
  const router = useRouter()

  return (
    <button
      {...props}
      type="button"
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          router.back()
        }
      }}
      className={`
        group flex gap-2 items-center justify-center
        px-4 py-2 bg-blue-600 hover:bg-blue-700
        text-white font-medium rounded-xl
        transition-all duration-250 active:scale-95
        shadow-md hover:shadow-lg w-full
        ${className}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 30 40"
        fill="none"
        aria-hidden="true"
        className="transition-transform group-hover:-translate-x-1"
      >
        <path
          d="M29.64 38.36L11.32 20L29.64 1.64L24 -4L0 20L24 44L29.64 38.36Z"
          fill="currentColor"
        />
      </svg>

      <span className="lg:text-xl">{text}</span>
    </button>
  )
}

export default BackButton
