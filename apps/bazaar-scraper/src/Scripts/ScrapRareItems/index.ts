import { RareItems } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import * as task from './tasks'

const SCRIPT_NAME = coloredText('ScrapRareItems', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const incompleteCollection = await task.fetchAllFirstPages()
  const completeCollection = await task.fetchOtherPages(incompleteCollection)

  const rareItems = new RareItems()
  rareItems.saveItemCollection(completeCollection)

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
