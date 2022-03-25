import fetch from 'node-fetch'

const REQUEST_TIMEOUT = 15000

export default class RevalidateClient {
  private static ENDPOINT = `https://exevo-pan-i8ojiafg2-exevopan.vercel.app/api/revalidate?secret=${process.env}`

  private static buildRoute = (route?: string): string =>
    `${this.ENDPOINT}${route ? `&route=${route}` : ''}`

  static async route(route?: string): Promise<void> {
    await fetch(this.buildRoute(route), {
      timeout: REQUEST_TIMEOUT,
    })
  }
}
