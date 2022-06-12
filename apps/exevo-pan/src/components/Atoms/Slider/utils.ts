import { Range, TransformFunction } from './types'

export const defaultTransform: TransformFunction = (value: number) => value

export const clampValue = (value: number, [min, max]: Range): number => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export const normalize = (value: number, [min, max]: Range): number =>
  (value - min) / (max - min)

export const denormalize = (value: number, [min, max]: Range): number =>
  (max - min) * value + min

const closestDistance = (a: number, b: number): number => {
  if (Math.abs(a) < Math.abs(b)) return a
  return b
}

const countDecimals = (value: number): number => {
  const [, decimals] = value.toString().split('.')

  return decimals?.length ?? 0
}

export const toFixedPrecision = (value: number, step: number): number =>
  parseFloat(value.toFixed(countDecimals(step)))

export const calculateClosestStep = (
  currentValue: number,
  step: number,
  [min, max]: Range,
): number => {
  if (step === 1) return Math.round(currentValue)
  if (currentValue === max) return max

  const adjustedValue = currentValue - min

  const distanceFromPreviousStep = (adjustedValue % step) * -1
  const distanceFromNextStep = step - (adjustedValue % step)
  const closestStepDistance = closestDistance(
    distanceFromPreviousStep,
    distanceFromNextStep,
  )

  const calculatedNewValue = adjustedValue + closestStepDistance + min

  return toFixedPrecision(calculatedNewValue, step)
}

export const getLeftOffset = (
  value: number,
  range: Range,
  invert: boolean,
): string => {
  const offset = normalize(value, range)
  return `${(invert ? 1 - offset : offset) * 100}%`
}

export const getKeyboardIncrement = (event: React.KeyboardEvent): number => {
  const sign: number = (
    {
      ArrowUp: 1,
      ArrowRight: 1,
      ArrowDown: -1,
      ArrowLeft: -1,
    } as Record<string, number>
  )[event.key]

  if (sign === undefined) return 0

  const { ctrlKey, shiftKey } = event
  return sign * (+!ctrlKey || 10) * (+!shiftKey || 100)
}

export const isInRange = (value: number, [min, max]: Range): boolean =>
  value >= min && value <= max
