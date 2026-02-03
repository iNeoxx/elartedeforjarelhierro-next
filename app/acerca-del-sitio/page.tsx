import { Metadata } from "next"
import { AcercaDelSitio } from "@/components/drupal/AcercaDelSitio"

export const metadata: Metadata = {
  title: "Acerca del sitio | El Arte de Forjar el Hierro",
  description: "Conoce al equipo de desarrollo detrás de El Arte de Forjar el Hierro.",
}

export default function AcercaDelSitioPage() {
  return (
    <main className="min-h-screen">
      <AcercaDelSitio />
    </main>
  )
}