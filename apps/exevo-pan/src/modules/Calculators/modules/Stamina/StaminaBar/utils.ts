import { MINUTES_IN } from 'utils'

const FULL_MINUTES = MINUTES_IN.HOUR * 42

export const getStaminaPercentage = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number)
  const currentMinutes = MINUTES_IN.HOUR * hours + minutes

  return `${Math.round((currentMinutes / FULL_MINUTES) * 100)}%`
}
