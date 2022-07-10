export const formatNumberWithCommas = (value: number | string): string =>
  value
    .toString()
    .replace(/,/g, '')
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
