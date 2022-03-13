/* eslint-disable no-await-in-loop */
import { sleep } from 'utils'
import { requests } from 'Constants'

const { MAX_CONCURRENT_REQUESTS, DELAY } = requests

export const batchPromises = async <T>(
  tasks: Array<() => Promise<T>>,
): Promise<T[]> => {
  const results: T[] = []

  for (let i = 0; i < tasks.length; i += MAX_CONCURRENT_REQUESTS) {
    const currentBatch = tasks.slice(i, i + MAX_CONCURRENT_REQUESTS)
    const batchResults: T[] = await Promise.all(currentBatch.map((fn) => fn()))

    batchResults.forEach((result) => results.push(result))
    await sleep(DELAY)
  }

  return results
}
