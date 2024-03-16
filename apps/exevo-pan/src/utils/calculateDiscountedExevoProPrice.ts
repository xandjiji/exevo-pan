import { exevoPro } from 'Constants'

export const roundToStep = (value: number, step: number) => {
  const distanceToNextStep = value % step
  const distanceToPreviousStep = step - distanceToNextStep

  return distanceToNextStep < distanceToPreviousStep
    ? value - distanceToNextStep
    : value + distanceToPreviousStep
}

export const calculateDiscountedExevoProPrice = (
  discountPercent: number,
  currency: 'PIX' | 'TIBIA_COINS',
) => {
  if (discountPercent > 100 || discountPercent < 0) {
    throw new Error(`Invalid discountPercent (${discountPercent})`)
  }

  const step = currency === 'PIX' ? 1 : 25
  const price =
    currency === 'PIX' ? exevoPro.price.PIX : exevoPro.price.TIBIA_COINS

  return roundToStep(price * 1 - discountPercent / 100, step)
}
