import { endpoints } from 'Constants'

export default class PageRevalidation {
  static async revalidatePage(route = '/'): Promise<void> {
    const endpoint = new URL(endpoints.REDIRECT_REVALIDATE)

    const currentParams = new URLSearchParams()
    currentParams.set('secret', process.env.REVALIDATION_AUTH ?? '')
    currentParams.set('route', route)

    endpoint.search = currentParams.toString()

    await fetch(endpoint.toString())
  }
}
