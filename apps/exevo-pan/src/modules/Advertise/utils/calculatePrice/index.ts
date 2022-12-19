import { advertising } from 'Constants'
import { DiscountParameters, AdvertiseOffer, CalculatePriceArgs } from './types'

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
    return (base - baseDiscount) * days
  }

  if (discountTier === 2) {
    return base * days - (days - 1) * baseDiscount
  }

  return base * days
}

const calculateOffer = ({
  base,
  days,
  isPro,
}: DiscountParameters): AdvertiseOffer => {
  const basePrice = base * days
  const proDiscount = isPro ? base / 3 : 0

  const discountedPrice = applyDiscount({ base, days, isPro }) - proDiscount

  const saved = basePrice - discountedPrice
  const offPercentage = Math.round((saved / basePrice) * 100)

  return {
    totalPrice: discountedPrice,
    saved: basePrice - discountedPrice,
    offPercentage: `${Number.isNaN(offPercentage) ? 0 : offPercentage}%`,
  }
}

export const calculatePrice = ({
  days,
  paymentMethod,
  isPro,
}: CalculatePriceArgs): AdvertiseOffer =>
  calculateOffer({
    base: paymentMethod === 'PIX' ? BRL_ADVERTISE : TIBIA_COINS_ADVERTISE,
    days,
    isPro,
  })
