import { pricing } from 'Constants'
import { PaymentMethods } from '../../contexts/Form/types'

export const calculatePrice = (
  daysCount: number,
  paymentMethod: PaymentMethods,
): string => {
  switch (paymentMethod) {
    case 'PIX':
      return `R$ ${daysCount * pricing.BRL_ADVERTISE},00 reais`

    case 'TIBIA_COINS':
    default:
      return `${daysCount * pricing.TIBIA_COINS_ADVERTISE} Tibia Coins`
  }
}
