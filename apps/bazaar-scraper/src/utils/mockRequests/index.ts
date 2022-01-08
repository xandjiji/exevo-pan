import { broadcast, coloredText, TrackETA } from 'logging'
import { sleep } from '../sleep'
import { retryWrapper } from '../retryWrapper'
import { batchPromises } from '../batchPromises'

const DEFAULT_AMOUNT = 100
const BASE_DELAY = 1500

export const mockedPromise = retryWrapper(async (errorChance = 0.05) => {
  await sleep(BASE_DELAY * Math.random())

  if (errorChance > Math.random()) {
    throw Error('error')
  }
})

export const runMockedRequests = async (
  amount = DEFAULT_AMOUNT,
  errorChance?: number,
): Promise<void> => {
  const eta = new TrackETA(amount, coloredText('Mocked requests', 'highlight'))

  const tasks = Array.from({ length: amount }, () => async () => {
    eta.incTask()
    broadcast(`Mocking request ${eta.getProgress()}`, 'neutral')
    await mockedPromise(errorChance)
  })

  await batchPromises(tasks)
  eta.finish()
}
