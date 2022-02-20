import { buildCharacterData } from 'shared-utils/dist/buildCharacterData'
import { readJsonl } from 'shared-utils/dist/jsonl'
import { broadcast, coloredText } from 'logging'
import { readServerData } from './utils'

const HISTORY_FILE = 'HistoryAuctions.jsonl'

export default async (): Promise<CharacterObject[]> => {
  broadcast(`Loading ${coloredText(HISTORY_FILE, 'highlight')}...`, 'system')
  const auctions: PartialCharacterObject[] = await readJsonl(
    `${__dirname}/${HISTORY_FILE}`,
  )

  const serverArray = await readServerData()

  return buildCharacterData(auctions, serverArray).reverse()
}
