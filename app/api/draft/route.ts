import { NextRequest } from "next/server"
import { enableDraftMode } from "next-drupal/draft"
import { drupal } from "@/lib/drupal"

export async function GET(request: NextRequest) {
  // Forzamos el request a 'any' para evitar el conflicto de versiones de NextRequest
  // entre tu proyecto y la dependencia next-drupal.
  return await enableDraftMode(request as any, drupal)
}