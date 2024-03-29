import { DAYS_IN, MILLISECONDS_IN, timestampDaysDiff } from 'utils'

const BRL_PRICE = {
  EXEVO_PRO: 40,
  TIBIA_COIN: 40 / 250,
}

const MONTH = DAYS_IN.MONTH * MILLISECONDS_IN.DAY

export const oneMonthAgo = () => new Date(+new Date() - MONTH).toISOString()

export const tcToBrl = (tc: number) => Math.round(tc * BRL_PRICE.TIBIA_COIN)

export const INITIAL_TIMESTAMP = {
  HIGHLIGHT: 1670946432809,
  EXEVO_PRO: 1670798862398,
}
export const toMonthlyAverage = (
  count: number,
  initialTimestamp: number,
): number => {
  const daysSinceStart = timestampDaysDiff(+new Date(), initialTimestamp)
  return (count / daysSinceStart) * DAYS_IN.MONTH
}

export const formatBrlValue = (value: number) => {
  const stringValue = value.toFixed(2).replace('.', ',')

  const [integerPart, decimalPart] = stringValue.split(',')

  return `R$ ${integerPart.replace(/(\d)(\d{3})$/, '$1.$2')},${decimalPart}`
}
