import { endpoints } from 'Constants'
import { CreateHighlightedAuctionPayload } from './types'

export default class BackofficeClient {
  static async notifyHighlight(
    highlightPayload: CreateHighlightedAuctionPayload,
  ): Promise<void> {
    await fetch(endpoints.BACKOFFICE_API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(highlightPayload),
    })
  }
}
