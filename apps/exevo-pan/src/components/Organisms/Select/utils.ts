import { Value } from './types'

const FALLBACK_INDEX = -1

export const findOptionIndexByValue = (
  options: Option[],
  value?: Value,
): number => {
  if (value === undefined) return FALLBACK_INDEX
  return options.findIndex((option) => option.value === value) ?? FALLBACK_INDEX
}
