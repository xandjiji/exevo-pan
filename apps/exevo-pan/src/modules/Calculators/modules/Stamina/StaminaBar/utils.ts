import { MINUTES_IN } from 'utils'

const FULL_MINUTES = MINUTES_IN.HOUR * 42

export const time2Minutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)

  return MINUTES_IN.HOUR * hours + minutes
}

export const getStaminaPercentage = (minutes: number): string =>
  `${Math.round((minutes / FULL_MINUTES) * 100)}%`

const GREEN_MINUTES = MINUTES_IN.HOUR * 39
const ORANGE_MINUTES = MINUTES_IN.HOUR * 14

export const staminaColor = (minutes: number): string => {
  if (minutes >= GREEN_MINUTES) return '#00c000'
  if (minutes >= ORANGE_MINUTES) return '#c66100'

  return '#f0f000'
}
