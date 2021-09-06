import { getNumberSign, formatNumberWithCommas } from 'utils'

export const formatDisplayValue = (value: number): string =>
  `${getNumberSign(value)}${formatNumberWithCommas(Math.abs(value))}`
