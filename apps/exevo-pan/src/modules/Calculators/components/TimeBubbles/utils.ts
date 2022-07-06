import { SECONDS_IN } from 'utils'

export const secondsToTimeObject = (seconds: number) => ({
  days: Math.floor(seconds / SECONDS_IN.DAY),
  hours: Math.floor((seconds % SECONDS_IN.DAY) / SECONDS_IN.HOUR),
  minutes: Math.ceil((seconds % SECONDS_IN.HOUR) / SECONDS_IN.MINUTE),
})
