const MILLISECONDS_IN_A_MINUTE = 60000

export const getTimeDiff = (timeStamp: number): string => {
  const timeStampDiff = +new Date() - timeStamp
  return `${Math.trunc(timeStampDiff / MILLISECONDS_IN_A_MINUTE)} minutes ago`
}
