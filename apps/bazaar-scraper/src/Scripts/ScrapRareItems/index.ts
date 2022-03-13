import { RareItems } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import { fetchAllFirstPages, fetchOtherPages } from './tasks'

const SCRIPT_NAME = coloredText('ScrapRareItems', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const incompleteCollection = await fetchAllFirstPages()
  const completeCollection = await fetchOtherPages(incompleteCollection)

  const rareItems = new RareItems()
  rareItems.saveItemCollection(completeCollection)

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
