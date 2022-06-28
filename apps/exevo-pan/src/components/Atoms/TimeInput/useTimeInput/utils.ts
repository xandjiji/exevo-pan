import { CanInferValueArgs } from './types'

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export const isNumber = (value: string) => numbers.includes(value)

export const canInferValue = ({ min, max, buffer }: CanInferValueArgs) => {
  if (buffer.length === max.toString().length) return true

  let i = 0
  while (i < numbers.length) {
    const nextPossibleValue = +(buffer + numbers[i])
    if (nextPossibleValue >= min && nextPossibleValue <= max) return false
    i += 1
  }

  return true
}

export const preventPropagation: React.MouseEventHandler = (e) =>
  e.stopPropagation()
