import { broadcast } from 'logging'
import fetch from 'node-fetch'
import { config } from 'dotenv'

const REQUEST_TIMEOUT = 15000
const BASE_URL = 'https://exevopan.com/api'

const getAuthToken = () => {
  config()
  const token = process.env.REVALIDATION_AUTH
  if (!token) {
    throw new Error(
      'Invalid token! Add `export REVALIDATION_AUTH="cf943cab-a1d2-4447-a0c5-bd910aaac4d2"` to `.env`',
    )
  }

  return token
}

export default class ExevoPanClient {
  static async revalidate(route?: string): Promise<void> {
    const { status } = await fetch(
      `${BASE_URL}/revalidate?secret=${getAuthToken()}${
        route ? `&route=${route}` : ''
      }`,
      { timeout: REQUEST_TIMEOUT },
    )

    if (status === 401) {
      broadcast('Unauthorized token', 'fail')
      throw new Error()
    }
  }

  static async notifyAuctionBid({
    auctionId,
    currentBid,
  }: {
    auctionId: number
    currentBid: number
  }): Promise<void> {
    const { status } = await fetch(
      `${BASE_URL}/auction-bidded?secret=${getAuthToken()}&auctionId=${auctionId}&currentBid=${currentBid}`,
      { timeout: REQUEST_TIMEOUT },
    )

    if (status === 401) {
      broadcast('Unauthorized token', 'fail')
      throw new Error()
    }
  }
}
