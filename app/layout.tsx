import { DraftAlert } from "@/components/misc/DraftAlert"
import HeaderNav from "@/components/navigation/HeaderNav"
import Footer from "@/components/navigation/Footer"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Roboto } from 'next/font/google'
import "@/styles/globals.css"

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '900']
})

export const metadata: Metadata = {
  title: {
    default: "El Arte de Forjar el Hierro",
    template: "%s | El Arte de Forjar el Hierro",
  },
  description: "El arte de forjar el Hierro Convierte tus ideas en productos de alta calidad",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Añadido suppressHydrationWarning aquí para evitar conflictos con extensiones */}
      <body className={roboto.className} suppressHydrationWarning={true}>
          <DraftAlert />
          <div className="flex flex-col min-h-screen">
              <HeaderNav />
            <main className="pt-6 flex-1 w-full mx-auto">
              {children}
            </main>
            <Footer />
          </div>
      </body>
    </html>
  )
}