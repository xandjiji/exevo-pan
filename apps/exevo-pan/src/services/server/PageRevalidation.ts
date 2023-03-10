import { endpoints } from 'Constants'

export default class PageRevalidation {
  static async revalidatePage(route = ''): Promise<null> {
    const isDev =
      process.env.NODE_ENV === 'development' &&
      !process.env.NEXT_PUBLIC_FRONT_DEV

    const endpoint = new URL(
      `${
        isDev
          ? 'http://localhost:3000'
          : `https://${process.env.NEXT_PUBLIC_VERCEL_URL as string}`
      }${endpoints.REVALIDATE_PAGE}`,
    )

    const currentParams = new URLSearchParams()
    currentParams.set('secret', process.env.REVALIDATION_AUTH ?? '')
    currentParams.set('route', route)

    endpoint.search = currentParams.toString()

    const response = await fetch(endpoint.toString())

    return response.json()
  }
}
