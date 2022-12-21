export interface EmailTemplateProps extends Omit<AdvertisePurchase, 'email'> {
  uuid: string
}

export interface ThankYouProps {
  isPro: boolean
  auctionId: number
  selectedDates: string[]
  paymentMethod: PaymentMethods
  paymentCharacter: string
  locale: string
}

export interface SummaryProps {
  uuid: string
  isPro: boolean
  advertisedCharacter: string
  auctionId: number
  selectedDates: string[]
  paymentMethod: PaymentMethods
  locale: string
}
