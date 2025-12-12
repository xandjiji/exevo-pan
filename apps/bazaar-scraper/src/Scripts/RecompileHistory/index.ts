/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { History } from 'Data'
import { AuctionPage } from 'Helpers'
import { broadcast, coloredText, TrackETA } from 'logging'
import { file } from 'Constants'
import { readJsonl, writeJsonl } from 'shared-utils/dist/jsonl'
import { fetchAuctionPage } from '../ScrapHistory/utils'

const SCRIPT_NAME = coloredText('RecompileHistory', 'highlight')

const UPDATED_HISTORY_FILE = `${file.HISTORY_AUCTIONS.path}(new)`
const BATCH_SIZE = 10000

const getUpdatedData = async (): Promise<PartialCharacterObject[]> => {
  try {
    const updatedData = await readJsonl<PartialCharacterObject>(
      UPDATED_HISTORY_FILE,
    )
    return updatedData
  } catch {
    return []
  }
}

const main = async (): Promise<void> => {
  broadcast(`Starting ${SCRIPT_NAME} script`, 'success')

  const updatedHistory = await getUpdatedData()
  const updatedIds = new Set(updatedHistory.map(({ id }) => id))

  const helper = new AuctionPage()
  await helper.loadServerData()
  const historyData = new History()
  await historyData.load()

  const currentHistory = historyData
    .getEntireHistory()
    .filter(({ id }) => !updatedIds.has(id))

  const taskTracking = new TrackETA(
    currentHistory.length,
    coloredText('Recompiling history', 'highlight'),
  )

  for (const { id } of currentHistory) {
    broadcast(
      `Scraping auction id: ${id} ${taskTracking.getProgress()}`,
      'neutral',
    )
    const newAuction = await helper.partialCharacterObject(
      await fetchAuctionPage(id),
      { requestDelay: 0 },
    )

    taskTracking.incTask()
    updatedHistory.push(newAuction)

    if (updatedHistory.length % BATCH_SIZE === 0) {
      await writeJsonl(UPDATED_HISTORY_FILE, updatedHistory)
    }
  }

  taskTracking.finish()

  await writeJsonl(UPDATED_HISTORY_FILE, updatedHistory)

  broadcast(`${SCRIPT_NAME} script finished!`, 'success')
}

export default main
