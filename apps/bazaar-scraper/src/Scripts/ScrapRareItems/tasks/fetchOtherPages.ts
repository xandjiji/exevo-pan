/* eslint-disable no-await-in-loop */
import { broadcast, coloredText, TrackETA } from 'logging'
import { batchPromises } from 'utils'
import { fetchItemPage } from '../utils'

const countRequests = (blocks: RareItemBlock[]): number => {
  let count = 0
  blocks.forEach(({ lastPageIndex }) => {
    if (lastPageIndex > 1) count += lastPageIndex - 1
  })
  return count
}

export const fetchOtherPages = async (
  incompleteCollection: RareItemBlockCollection,
): Promise<RareItemBlockCollection> => {
  const fullCollection = { ...incompleteCollection }

  const incompleteBlocks = Object.values(incompleteCollection).filter(
    ({ lastPageIndex }) => lastPageIndex > 1,
  )

  const totalRequests = countRequests(incompleteBlocks)
  if (totalRequests) {
    const taskTracking = new TrackETA(
      totalRequests,
      coloredText('Scraping rest of the rare items', 'highlight'),
    )

    const incompleteItemRequests = incompleteBlocks.map(
      ({ name, lastPageIndex }) =>
        async () => {
          for (let index = 2; index <= lastPageIndex; index += 1) {
            taskTracking.incTask()
            broadcast(
              `Scraping ${name}'s other pages ${taskTracking.getProgress()}`,
              'neutral',
            )

            const rareItemBlock = await fetchItemPage(name, index)
            fullCollection[name].ids = [
              ...fullCollection[name].ids,
              ...rareItemBlock.ids,
            ]
          }
        },
    )

    await batchPromises(incompleteItemRequests, { DELAY: 1500 })
    taskTracking.finish()
  }

  return fullCollection
}
