import { endpoints } from 'Constants'

export default class TibiaTrade {
  static async getHighlightedItems(): Promise<TibiaTradeHighlightedItem[]> {
    try {
      const response = await fetch(endpoints.TIBIA_TRADE)

      const payload: { ads: TibiaTradeHighlightedItem[] } =
        await response.json()

      return payload.ads
    } catch {
      return []
    }
  }
}
