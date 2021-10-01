import { advertising } from 'Constants'
import { PaymentMethods } from '../../contexts/Form/types'

export const calculatePrice = (
  daysCount: number,
  paymentMethod: PaymentMethods,
): string => {
  switch (paymentMethod) {
    case 'PIX':
      return `R$ ${daysCount * advertising.BRL_ADVERTISE},00 reais`

    case 'TIBIA_COINS':
    default:
      return `${daysCount * advertising.TIBIA_COINS_ADVERTISE} Tibia Coins`
  }
}
