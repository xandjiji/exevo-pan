import { formatNumberWithCommas } from 'utils'

export const format = {
  displayValue: (value: number): string =>
    formatNumberWithCommas(value, value < 0),
  diffValue: (value: number): string => formatNumberWithCommas(value, true),
}
