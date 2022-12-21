export interface AdvertiseOffer {
  totalPrice: number
  saved: number
  offPercentage: string
}

export type DiscountParameters = {
  base: number
  days: number
  isPro: boolean
}

export type CalculatePriceArgs = {
  days: number
  paymentMethod: PaymentMethods
  isPro: boolean
}
