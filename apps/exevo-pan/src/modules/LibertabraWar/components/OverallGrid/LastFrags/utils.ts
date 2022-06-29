import { MILLISECONDS_IN } from 'utils'

export const getTimeDiff = (timeStamp: number): number => {
  const timeStampDiff = +new Date() - timeStamp
  return Math.trunc(timeStampDiff / MILLISECONDS_IN.MINUTE)
}
