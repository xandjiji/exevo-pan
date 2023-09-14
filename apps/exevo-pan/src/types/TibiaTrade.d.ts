/* eslint-disable camelcase */

type ItemAttributes = {
  item_name: string
  item_look: string

  house_id: null
  tibia_id?: never
  house_name?: never
  town?: never
  size?: never
  rooms?: never
  beds?: never
  floors?: never
  rent?: never
  windows?: never
  furnitures?: never
  coordinates?: never
}

type HouseAttributes = {
  house_id: number
  tibia_id: number
  house_name: string
  town: string
  size: number
  rooms: number
  beds: number
  floors: number
  rent: number
  windows: number
  furnitures: string
  coordinates: string

  item_name?: never
  item_look?: never
}

declare type TibiaTradeApiResponse = {
  ads: Array<
    {
      id: number
      item_amount: number
      item_id: number
      item_tier: number
      username: string
      user_id: number
      price: number // 0 -> offers
      currency_type: number // 0 -> gold // 1 -> TC // 2 -> both
      type: number // 0 -> sell // 1 -> buy
      world_id: number
      world_name: string
      world_pvp_type: string
      world_battleye_color: string // green | yellow
      created_at: string
      is_closed: number
      is_rookgaard: boolean
      is_user_verified: boolean
      likes: number
      highlighted_until: string
      is_guildhall: boolean
    } & (ItemAttributes | HouseAttributes)
  >
}

declare type TibiaTradeHighlightedItem = {
  url: string
  imgSrc: string
  offer: 'buy' | 'sell'
  greenBattleye: boolean
  serverName: string
  value?: {
    price: number
    currency: 'tc' | 'gp'
  }
}
