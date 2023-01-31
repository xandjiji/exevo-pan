import { broadcast } from 'logging'
import fetch from 'node-fetch'
import { config } from 'dotenv'

const REQUEST_TIMEOUT = 15000
const BASE_URL = 'https://exevopan.com/api'

const buildRoute = (route?: string): string => {
  config()
  const token = process.env.REVALIDATION_AUTH

  if (!token) {
    throw new Error(
      'Invalid token! Add `export REVALIDATION_AUTH="cf943cab-a1d2-4447-a0c5-bd910aaac4d2"` to `.env`',
    )
  }

  return `${BASE_URL}/revalidate?secret=${token}${
    route ? `&route=${route}` : ''
  }`
}

export default class ExevoPanClient {
  static async revalidate(route?: string): Promise<void> {
    const { status } = await fetch(buildRoute(route), {
      timeout: REQUEST_TIMEOUT,
    })

    if (status === 401) {
      broadcast('Unauthorized revalidation token', 'fail')
      throw new Error()
    }
  }
}
