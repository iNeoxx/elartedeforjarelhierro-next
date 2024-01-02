import Link from "next/link"
import { Roboto } from 'next/font/google'
import { PreviewAlert } from "components/preview-alert"
// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const roboto = Roboto ({
  subsets: ['latin'],
  weight: ['100','400','900']
})

export function Layout({ children }) {
  return (
      <NextUIProvider className={roboto.className}>
      <PreviewAlert/>
        <header>
          <Navbar/>
        </header>
        <main className="pt-6 mx-auto">{children}</main>
        <Footer />
      </NextUIProvider>
  )
}
