export interface AdvertiseOffer {
  totalPrice: number
  saved: number
  offPercentage: string
}

export type DiscountParameters = {
  base: number
  days: number
}
