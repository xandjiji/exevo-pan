import { advertising } from 'Constants'

export const calculatePrice = (
  daysCount: number,
  paymentMethod: PaymentMethods,
): string => {
  switch (paymentMethod) {
    case 'PIX':
      return `R$ ${daysCount * advertising.BRL_ADVERTISE},00 reais`

    case 'TIBIA_COINS':
    default:
      return `${daysCount * advertising.TIBIA_COINS_ADVERTISE} Tibia Coins`
  }
}

const formatReadableDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const day = date.getDate().toString()
  const month = (date.getMonth() + 1).toString()
  const year = date.getFullYear().toString()

  return `${day}/${month}/${year}`
}

export const sortAndFormatDates = (dates: string[]): string[] =>
  dates
    .map((dateString) => +new Date(dateString))
    .sort((a, b) => a - b)
    .map(formatReadableDate)
