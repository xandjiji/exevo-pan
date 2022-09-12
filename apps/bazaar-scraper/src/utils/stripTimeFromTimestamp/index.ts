export const stripTimeFromTimestamp = (timestamp: number): number =>
  +new Date(new Date(timestamp).toDateString())
