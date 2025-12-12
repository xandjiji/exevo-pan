import { broadcast, coloredText, TrackETA } from 'logging'
import { batchPromises } from 'utils'
import { buildRareItemCollection, fetchItemPage } from '../utils'
import { itemList } from '../items'

export const fetchAllFirstPages =
  async (): Promise<RareItemBlockCollection> => {
    const lastIndex = itemList.length
    const taskTracking = new TrackETA(
      lastIndex,
      coloredText('Scraping rare item auction blocks', 'highlight'),
    )

    const rareItemBlockRequests = itemList.map((name) => async () => {
      taskTracking.incTask()
      broadcast(
        `Scraping ${name}'s frist page ${taskTracking.getProgress()}`,
        'neutral',
      )

      const rareItemBlock = await fetchItemPage(name, 1)
      return rareItemBlock
    })

    const rareItemBlocks = await batchPromises(rareItemBlockRequests, {
      DELAY: 1500,
    })
    taskTracking.finish()

    return buildRareItemCollection(rareItemBlocks)
  }
