import { broadcast, tabBroadcast } from 'logging'
import { sleep } from 'utils'
import { requests } from 'Constants'

const BASE_DELAY = 2
const MILLISECONDS = 1000

const exponentialBackoffDelay = async (retriesLeft: number): Promise<void> => {
  if (retriesLeft > 0) {
    const magnitude = requests.MAX_RETRIES - retriesLeft
    const exponentialDelay = BASE_DELAY ** magnitude * MILLISECONDS

    tabBroadcast(`Next retry in ${exponentialDelay}ms`, 'control')
    await sleep(exponentialDelay)
  }
}

const retryCall = async <T>(
  callback: () => Promise<T>,
  retries = requests.MAX_RETRIES,
  // eslint-disable-next-line consistent-return
): Promise<T> => {
  if (retries > 0) {
    try {
      const result = await callback()
      return result
    } catch (error) {
      tabBroadcast('ERROR! Trying again...', 'fail')

      const retriesLeft = retries - 1
      await exponentialBackoffDelay(retriesLeft)
      return retryCall(callback, retriesLeft)
    }
  } else {
    broadcast('Max tries reached', 'control')
    process.exit()
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const retryWrapper = <F extends (...args: any[]) => any>(
  callback: F,
) => {
  const wrapped = async (...args: Parameters<F>) =>
    retryCall(() => callback(...args))

  return wrapped as (...args: Parameters<F>) => Promise<ReturnType<F>>
}
