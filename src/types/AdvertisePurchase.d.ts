declare type PixObject = {
  payload: string
  qrCode: string
}

declare type AdvertisePurchase = {
  uuid: string
  selectedCharacter: CharacterObject
  selectedDates: string[]
  paymentMethod: string
  email: string
  paymentCharacter: string
  pixPayment?: PixObject
}
