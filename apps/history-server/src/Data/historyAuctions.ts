/* eslint-disable no-restricted-syntax */
import { buildCharacterData } from 'shared-utils/dist/buildCharacterData'
import { readJsonl } from 'shared-utils/dist/jsonl'
import { broadcast, coloredText } from 'logging'
import miniServerData from './ServerData.json'

const serverArray = Object.values(
  miniServerData as Record<string, ServerObject>,
)

const HISTORY_FILE = 'HistoryAuctions.jsonl'

export const loadAuctions = async (): Promise<CharacterObject[]> => {
  broadcast(`Loading ${coloredText(HISTORY_FILE, 'highlight')}...`, 'system')
  const auctions: PartialCharacterObject[] = await readJsonl(
    `${__dirname}/${HISTORY_FILE}`,
  )

  return buildCharacterData(auctions, serverArray).reverse()
}
