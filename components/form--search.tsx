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
    <div className="w-1/2 sm:w-1/4">
      <form
        className="flex"
        onSubmit={onSubmit}
        {...props}
      >
        
          <Input
            id="keys"
            name="keys"
            isRequired
            className={`h-10 w-full md:w-96 ${styles.form_input}`}
            label="Buscar un producto..."
          />
          <input
            type="submit"
            className={`w-24 ${styles.form_button}`}
            value="Buscar"
          />
      </form>
    </div>
  )
}

