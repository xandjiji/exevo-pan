import { buildCharacterData } from 'shared-utils/dist/buildCharacterData'
import { readLocalFile, readServerData } from './utils'

const AUCTIONS_FILE = 'CurrentAuctions.json'

export default async (): Promise<CharacterObject[]> => {
  const serverArray = await readServerData()

  const auctions = await readLocalFile<PartialCharacterObject[]>(AUCTIONS_FILE)

  return buildCharacterData(auctions, serverArray)
}
