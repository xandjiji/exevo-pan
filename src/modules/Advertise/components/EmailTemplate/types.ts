export interface EmailTemplateProps extends AdvertisePurchase {
  uuid: string
}

export interface ThankYouProps {
  auctionId: number
  selectedDates: string[]
  paymentMethod: PaymentMethods
  paymentCharacter: string
}

export interface SummaryProps {
  uuid: string
  advertisedCharacter: string
  selectedDates: string[]
  paymentMethod: PaymentMethods
}
