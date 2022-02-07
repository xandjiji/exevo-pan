export interface AdvertisePrice {
  totalPrice: number
  saved: number
  offPercentage: string
}

export interface AdvertiseOffer extends AdvertisePrice {
  readablePrice: string
  readableSaved: string
}

export type DiscountParameters = {
  base: number
  days: number
}
