export const formatNumberWithCommas = (value: number | string): string => {
  const [sign] = value.toString()

  const formattedValue = value
    .toString()
    .replace(/,/g, '')
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return sign === '-' ? `-${formattedValue}` : formattedValue
}
