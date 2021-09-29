import { PaymentMethods } from '../../contexts/Form/types'

export const calculatePrice = (
  daysCount: number,
  paymentMethod: PaymentMethods,
): string => {
  switch (paymentMethod) {
    case 'PIX':
      return `R$ ${daysCount * 10},00 reais`

    case 'TIBIA_COINS':
    default:
      return `${daysCount * 50} Tibia Coins`
  }
}
