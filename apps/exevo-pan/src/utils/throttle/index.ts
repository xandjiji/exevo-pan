/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

type FnCall = (() => void) | undefined

export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) => {
  let isThrottled = false
  let lastCall: FnCall

  const throttled = (...args: Parameters<F>) => {
    if (!isThrottled) {
      func(...args)
      isThrottled = true
      setTimeout(() => {
        lastCall?.()
        lastCall = undefined

        isThrottled = false
      }, waitFor)
    } else {
      lastCall = () => func(...args)
    }
  }

  return throttled as (...args: Parameters<F>) => ReturnType<F>
}
