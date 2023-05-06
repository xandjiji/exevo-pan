import { getNumberSign } from './getNumberSign'

export const formatNumberWithCommas = (
  value: number | string,
  displaySign = false,
): string => {
  const formattedValue = value
    .toString()
    .replace(/,/g, '')
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return displaySign
    ? `${getNumberSign(+value)}${formattedValue}`
    : formattedValue
}
