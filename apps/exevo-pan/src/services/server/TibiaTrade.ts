import { endpoints, links } from 'Constants'

type TibiaTradeApiItemData = TibiaTradeApiResponse['ads'][number]

const TIBIA_TRADE_BASE_URL = links.TIBIA_TRADE

const resolve = {
  link: (item: TibiaTradeApiItemData) => {
    const base = `${TIBIA_TRADE_BASE_URL}/trade`
    if (item.house_id === null) {
      return `${base}/${item.item_name.replaceAll(' ', '-')}-${item.id}`
    }

    return `${base}/${item.house_name.replaceAll(' ', '-')}-${item.id}`
  },
  imgSrc: (item: TibiaTradeApiItemData) => {
    const base = `${TIBIA_TRADE_BASE_URL}/images`
    if (item.house_id === null) {
      return `${base}/item/${item.item_name.replaceAll(' ', '_')}.gif`
    }

    return `${base}/house/location/${item.tibia_id}`
  },
}

const tryTransform = (
  item: TibiaTradeApiItemData,
): TibiaTradeHighlightedItem | number => {
  try {
    const transformed: TibiaTradeHighlightedItem = {
      name: item.house_name ?? item.item_name,
      url: resolve.link(item),
      imgSrc: resolve.imgSrc(item),
      offer: item.type === 0 ? 'sell' : 'buy',
      value:
        item.price === 0 || item.currency_type > 1
          ? null
          : {
              price: item.price,
              currency: item.currency_type === 0 ? 'gp' : 'tc',
            },
      serverName: item.world_name,
      greenBattleye: item.world_battleye_color === 'green',
    }

    return transformed
  } catch {
    return item.id
  }
}

export default class TibiaTrade {
  static async getHighlightedItems(): Promise<{
    items: TibiaTradeHighlightedItem[]
    badIds: number[]
  }> {
    try {
      const response = await fetch(endpoints.TIBIA_TRADE)

      const payload: TibiaTradeApiResponse = await response.json()

      const items: TibiaTradeHighlightedItem[] = []
      const badIds: number[] = []

      payload.ads.forEach((rawItem) => {
        const result = tryTransform(rawItem)
        if (typeof result === 'object') {
          items.push(result)
        } else {
          badIds.push(result)
        }
      })

      return { items, badIds }
    } catch {
      return { items: [], badIds: [] }
    }
  }
}
