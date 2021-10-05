declare type PaymentMethods = 'TIBIA_COINS' | 'PIX'

declare type PixObject = {
  payload: string
  qrCode: string
}

declare type AdvertisePurchase = {
  uuid: string
  selectedCharacter: CharacterObject
  selectedDates: string[]
  paymentMethod: PaymentMethods
  email: string
  paymentCharacter: string
}
