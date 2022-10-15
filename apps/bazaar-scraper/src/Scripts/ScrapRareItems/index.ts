/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { broadcast, tabBroadcast, coloredText, Timer } from 'logging'
import { fetchAllFirstPages, fetchOtherPages } from './tasks'
import { db } from './utils'

const SCRIPT_NAME = coloredText('ScrapRareItems', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const incompleteCollection = await fetchAllFirstPages()
  const completeCollection = await fetchOtherPages(incompleteCollection)

  const rareItemBlocks = Object.values(completeCollection)

  broadcast(`Updating rare items database...`, 'neutral')
  for (const { name, ids } of rareItemBlocks) {
    tabBroadcast(
      `Upserting data for ${coloredText(name, 'highlight')} (${coloredText(
        ids.length,
        'success',
      )})`,
      'control',
    )
    await Promise.all(ids.map((id) => db.upsertRareItem({ name, id })))
  }

  broadcast(`Updating current rare item optons...`, 'neutral')
  await db.upsertCurrentRareItemNames(rareItemBlocks.map(({ name }) => name))

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
