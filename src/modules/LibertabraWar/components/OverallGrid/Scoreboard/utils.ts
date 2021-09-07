import { getNumberSign, formatNumberWithCommas } from 'utils'

export const formatDiffValue = (value: number): string =>
  `${getNumberSign(value)}${formatNumberWithCommas(Math.abs(value))}`
