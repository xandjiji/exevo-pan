import fetch from 'node-fetch'

const REQUEST_TIMEOUT = 15000

const ENDPOINT = 'https://exevopan.com/api/revalidate'

const buildRoute = (route?: string): string => {
  const token = process.env.REVALIDATION_AUTH

  if (!token) {
    throw new Error(
      'Invalid token! Add `export REVALIDATION_AUTH="cf943cab-a1d2-4447-a0c5-bd910aaac4d2"` to your `~/.bashrc` file',
    )
  }

  return `${ENDPOINT}?secret=${token}${route ? `&route=${route}` : ''}`
}

export default class RevalidateClient {
  static async route(route?: string): Promise<void> {
    await fetch(buildRoute(route), {
      timeout: REQUEST_TIMEOUT,
    })
  }
}
