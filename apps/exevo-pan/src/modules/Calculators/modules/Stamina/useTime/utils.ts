import { SECONDS_IN } from 'utils'

export const time2Seconds = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)

  return hours * SECONDS_IN.HOUR + minutes * SECONDS_IN.MINUTE
}
