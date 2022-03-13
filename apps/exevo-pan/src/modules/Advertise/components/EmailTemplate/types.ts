export interface EmailTemplateProps extends Omit<AdvertisePurchase, 'email'> {
  uuid: string
}

export interface ThankYouProps {
  auctionId: number
  selectedDates: string[]
  paymentMethod: PaymentMethods
  paymentCharacter: string
  locale: string
}

export interface SummaryProps {
  uuid: string
  advertisedCharacter: string
  auctionId: number
  selectedDates: string[]
  paymentMethod: PaymentMethods
  locale: string
}
