declare type PaymentMethods = 'TIBIA_COINS' | 'PIX'

declare type PixObject = {
  payload: string
  qrCode: string
}

declare interface AdvertisePurchase {
  isPro: boolean
  selectedCharacter: CharacterObject
  selectedDates: string[]
  paymentMethod: PaymentMethods
  email: string
  paymentCharacter: string
  locale: string
  timezoneOffsetMinutes: number
}

declare type HighlightedAuctionData = {
  nickname: string
  id: number
  days: string[]
  timestamp: number
  active: boolean
  confirmed: boolean
}
