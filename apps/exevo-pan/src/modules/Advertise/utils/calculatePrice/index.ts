import { advertising } from 'Constants'
import { readablePrice } from './utils'
import { DiscountParameters, AdvertisePrice, AdvertiseOffer } from './types'

const { TIBIA_COINS_ADVERTISE, BRL_ADVERTISE } = advertising

export const getDiscountTier = (days: number): number => {
  if (days >= 5) return 3
  if (days >= 2) return 2
  return 1
}

const applyDiscount = ({ base, days }: DiscountParameters): number => {
  const discountTier = getDiscountTier(days)
  const baseDiscount = base / 3

  if (discountTier === 3) {
    return base * days - days * baseDiscount
  }

  if (discountTier === 2) {
    return base * days - (days - 1) * baseDiscount
  }

  return base * days
}

const calculateOffer = ({ base, days }: DiscountParameters): AdvertisePrice => {
  const basePrice = base * days

  const discountedPrice = applyDiscount({ base, days })

  const saved = basePrice - discountedPrice

  return {
    totalPrice: discountedPrice,
    saved: basePrice - discountedPrice,
    offPercentage: `${Math.round((saved / basePrice) * 100)}%`,
  }
}

export const calculatePrice = (
  days: number,
  paymentMethod: PaymentMethods,
): AdvertiseOffer => {
  const offer = calculateOffer({
    base: paymentMethod === 'PIX' ? BRL_ADVERTISE : TIBIA_COINS_ADVERTISE,
    days,
  })
  const { totalPrice, saved } = offer

  return {
    ...offer,
    readablePrice: readablePrice(totalPrice, paymentMethod),
    readableSaved: readablePrice(saved, paymentMethod),
  }
}
