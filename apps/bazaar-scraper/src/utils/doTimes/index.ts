export const doTimes = (action: () => void, times: number) =>
  Array.from(Array(times)).forEach(action)
