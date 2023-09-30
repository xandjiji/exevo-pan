import { buildCharacterData } from 'shared-utils/dist/buildCharacterData'
import characterData from './CurrentAuctions.json'
import miniServerData from './ServerData.json'

const serverArray = Object.values(
  miniServerData as Record<string, ServerObject>,
)

export const auctions = buildCharacterData(
  characterData as PartialCharacterObject[],
  serverArray,
)
