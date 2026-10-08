import { NextDrupal } from "next-drupal"

const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string

export const drupal = new NextDrupal(baseUrl, {
  // Enable to use authentication
  // auth: {
  //   clientId: process.env.DRUPAL_CLIENT_ID as string,
  //   clientSecret: process.env.DRUPAL_CLIENT_SECRET as string,
  // },
  // withAuth: true,
  // debug: true,
})
