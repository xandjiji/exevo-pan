/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { RareItems } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import { fetchAllFirstPages, fetchOtherPages } from './tasks'
import { db } from './utils'

const SCRIPT_NAME = coloredText('ScrapRareItems', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const incompleteCollection = await fetchAllFirstPages()
  const completeCollection = await fetchOtherPages(incompleteCollection)

  const rareItemBlocks = Object.values(completeCollection)

  for (const { name, ids } of rareItemBlocks) {
    await Promise.all(ids.map((id) => db.upsertRareItem({ name, id })))
  }

  // transaçao: remover todos os CurrentRareItems e adicionar dnv

  const rareItems = new RareItems()
  rareItems.saveItemCollection(completeCollection)

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
