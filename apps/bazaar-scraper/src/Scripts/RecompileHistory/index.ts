/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { History } from 'Data'
import { AuctionPage } from 'Helpers'
import { broadcast, coloredText, TrackETA } from 'logging'
import { file } from 'Constants'
import { writeJsonl } from 'shared-utils/dist/jsonl'
import { fetchAuctionPage } from '../ScrapHistory/utils'

const SCRIPT_NAME = coloredText('RecompileHistory', 'highlight')

const main = async (): Promise<void> => {
  broadcast(`Starting ${SCRIPT_NAME} script`, 'success')

  const helper = new AuctionPage()
  await helper.loadServerData()
  const historyData = new History()
  await historyData.load()

  const currentHistory = historyData.getEntireHistory()
  const updatedHistory: typeof currentHistory = []

  const taskTracking = new TrackETA(
    currentHistory.length,
    coloredText('Recompiling history', 'highlight'),
  )

  for (const { id } of currentHistory) {
    const newAuction = await helper.partialCharacterObject(
      await fetchAuctionPage(id),
    )

    taskTracking.incTask()
    updatedHistory.push(newAuction)
  }

  taskTracking.finish()

  await writeJsonl(`${file.HISTORY_AUCTIONS.path}(new)`, updatedHistory)

  broadcast(`${SCRIPT_NAME} script finished!`, 'success')
}

export default main
