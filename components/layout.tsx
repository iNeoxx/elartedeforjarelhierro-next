import Link from "next/link"
import { Roboto } from 'next/font/google'
import { PreviewAlert } from "components/preview-alert"
// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const roboto = Roboto ({
  weight: '400',
  subsets: ['latin'],
})

export function Layout({ children }) {
  return (
      <NextUIProvider className={roboto.className}>
      <PreviewAlert/>
        <header>
          <Navbar/>
        </header>
        <main className="py-10 mx-auto">{children}</main>
        <Footer />
      </NextUIProvider>
  )
}
