import { DAYS_IN, MILLISECONDS_IN, timestampDaysDiff } from 'utils'

const MONTH = DAYS_IN.MONTH * MILLISECONDS_IN.DAY
export const oneMonthAgo = () => new Date(+new Date() - MONTH).toISOString()

const BRL_PRICE = 40
export const toBrl = (count: number) => {
  const stringValue = (count * BRL_PRICE).toFixed(2).replace('.', ',')

  const [integerPart, decimalPart] = stringValue.split(',')

  return `R$ ${integerPart.replace(/(\d)(\d{3})$/, '$1.$2')},${decimalPart}`
}

const INITIAL_TIMESTAMP = 1670798862398
export const toMonthlyAverageCount = (count: number): number => {
  const daysSinceStart = timestampDaysDiff(+new Date(), INITIAL_TIMESTAMP)
  return (count / daysSinceStart) * DAYS_IN.MONTH
}
