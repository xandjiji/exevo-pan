declare type PaymentMethods = 'TIBIA_COINS' | 'PIX'

declare type PixObject = {
  payload: string
  qrCode: string
}

declare interface AdvertisePurchase {
  selectedCharacter: CharacterObject
  selectedDates: string[]
  paymentMethod: PaymentMethods
  email: string
  paymentCharacter: string
  locale: string
}

declare type HighlightedAuctionData = {
  id: number
  days: string[]
}
