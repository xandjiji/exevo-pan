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
  const price = currency === 'PIX' ? 45 : 250

  return roundToStep(price * 1 - discountPercent, step)
}
