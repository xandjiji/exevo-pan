import { advertising } from 'Constants'
import { DiscountParameters, AdvertiseOffer, CalculatePriceArgs } from './types'

export const getDiscountTier = (days: number): number => {
  if (days >= 5) return 3
  if (days >= 2) return 2
  return 1
}

const applyDiscount = ({ base, days }: DiscountParameters): number => {
  const discountTier = getDiscountTier(days)
  const baseDiscount = base / advertising.PRICE_UNIT_DIVIDER

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
  const proDiscount = isPro ? base / advertising.PRICE_UNIT_DIVIDER : 0

  const discountedPrice = Math.max(
    0,
    applyDiscount({ base, days, isPro }) - proDiscount,
  )

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
    base:
      paymentMethod === 'PIX'
        ? advertising.basePrice.BRL
        : advertising.basePrice.TIBIA_COINS,
    days,
    isPro,
  })
