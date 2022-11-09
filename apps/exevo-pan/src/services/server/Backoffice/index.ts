import { endpoints } from 'Constants'
import { CreateHighlightedAuctionPayload } from './types'

export default class BackofficeClient {
  private static backofficeEndpoint = `${endpoints.BACKOFFICE_API}`

  static async notifyHighlight(
    highlightPayload: CreateHighlightedAuctionPayload,
  ): Promise<void> {
    await fetch(this.backofficeEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(highlightPayload),
    })
  }
}
