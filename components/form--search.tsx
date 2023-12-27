import * as React from "react"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "@/components/FormSearch.module.css"
import {Input, Button} from "@nextui-org/react";

interface FormSearchProps extends React.HTMLProps<HTMLFormElement> {}

export function FormSearch({ className, ...props }: FormSearchProps) {
  const router = useRouter()

  const onSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    // Redirect to search page.
    window.location.href = `/search?keys=${data.get("keys")}`
  }

  return (
    <div className="pl-5 w-1/4 max-[1024px]:w-full max-[1024px]:py-5">
      <form
        className="flex"
        onSubmit={onSubmit}
        {...props}
      >
        
          <Input
            id="keys"
            name="keys"
            radius="none"
            isRequired
            classNames={{
              inputWrapper: [
                "shadow-xl",
                "bg-white",
                "rounded-l-lg",
                "h-10"
              ],
            }}
            placeholder="Buscar un producto..."
            startContent={<svg className="fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="25px" height="25px">
            <path
            d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
            </svg>}
          />
          <Button
            type="submit"
            className={`font-bold ${styles.form_button}`}
            value="Buscar"
          >Buscar</Button>
      </form>
    </div>
  )
}

