/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { broadcast, tabBroadcast, coloredText } from 'logging'
import { db } from '../utils'

export const updateDatabase = async (
  rareItemBlockCollection: RareItemBlockCollection,
): Promise<void> => {
  const rareItemBlocks = Object.values(rareItemBlockCollection)

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
}
