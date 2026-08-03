function getId() {
  return Math.floor(Math.random() * (492393 - 126833 + 1)) + 126833
}
function getLevel() {
  return Math.floor(Math.random() * (1203 - 1 + 94)) + 94
}
function getGem() {
  return Math.floor(Math.random() * (21 - 1 + 1)) + 1
}
function serverId() {
  return Math.floor(Math.random() * (133 - 1 + 1)) + 1
}
function vocationId() {
  return Math.floor(Math.random() * (5 - 1 + 1)) + 1
}
function getNormalizeSkill() {
  return Math.floor(Math.random() * (120 - 10 + 1)) + 10
}
function getNormalizeBid() {
  return Math.floor(Math.random() * (50000000 - 1000 + 1)) + 1000
}
function getAuctionEnd() {
  return Date.now() + Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
}
function getNormalizeString(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz'
  const string = Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('')
  return string.charAt(0).toUpperCase() + string.slice(1)
}
function getNormalizeBoolean() {
  return Math.random() < 0.5
}
function getNormalizedArray<T>(array: T[]): T[] {
  const missingCount = Math.floor(Math.random() * (array.length + 1))
  const keepCount = array.length - missingCount

  return [...array]
    .map((value, index) => ({ value, index }))
    .sort(() => Math.random() - 0.5)
    .slice(0, keepCount)
    .sort((a, b) => a.index - b.index)
    .map(({ value }) => value)
}
function getNormalizeSkills(): CharacterSkillsObject {
  return {
    magic: getNormalizeSkill(),
    club: getNormalizeSkill(),
    fist: getNormalizeSkill(),
    sword: getNormalizeSkill(),
    fishing: getNormalizeSkill(),
    axe: getNormalizeSkill(),
    distance: getNormalizeSkill(),
    shielding: getNormalizeSkill(),
  }
}

const locations: ServerObject['serverLocation'][] = [
  { string: 'OCE', type: 3 },
  { string: 'BR', type: 2 },
  { string: 'EU', type: 0 },
  { string: 'NA', type: 1 },
]
const pvpTypes: ServerObject['pvpType'][] = [
  { string: 'Hardcore', type: 3 },
  { string: 'Open', type: 1 },
  { string: 'Optional', type: 0 },
  { string: 'Retro Hardcore', type: 4 },
  { string: 'Retro Open', type: 2 },
]

function getNormalizeServerData(): ServerObject {
  return {
    battleye: getNormalizeBoolean(),
    experimental: getNormalizeBoolean(),
    serverId: serverId(),
    serverName: '',
    serverLocation: locations[Math.floor(Math.random() * locations.length)],
    pvpType: pvpTypes[Math.floor(Math.random() * pvpTypes.length)],
  }
}

let nextServer = ''

function normalize(data: CharacterObject): CharacterObject {
  const normalized: CharacterObject = {
    ...data,
    id: getId(),
    nickname: getNormalizeString(10),
    auctionEnd: getAuctionEnd(),
    currentBid: getNormalizeBid(),
    hasBeenBidded: getNormalizeBoolean(),
    serverId: serverId(),
    vocationId: vocationId(),
    sex: getNormalizeBoolean(),
    level: getLevel(),
    achievementPoints: Math.floor(Math.random() * 500),
    bossPoints: Math.floor(Math.random() * 2000),
    tcInvested: Math.floor(Math.random() * 50000),
    tags: getNormalizedArray(data.tags),
    imbuements: getNormalizedArray(data.imbuements),
    items: getNormalizedArray(data.items),
    transfer: getNormalizeBoolean(),
    quests: getNormalizedArray(data.quests),
    storeItems: getNormalizedArray(data.storeItems),
    outfits: getNormalizedArray(data.outfits),
    storeOutfits: getNormalizedArray(data.storeOutfits),
    mounts: getNormalizedArray(data.mounts),
    storeMounts: getNormalizedArray(data.storeMounts),
    rareAchievements: [],
    skills: getNormalizeSkills(),
    serverData: {
      ...getNormalizeServerData(),
      serverName: nextServer || data.serverData.serverName,
    },
    hirelings: {
      count: Math.floor(Math.random() * 10),
      jobs: Math.floor(Math.random() * 5),
      outfits: Math.floor(Math.random() * 5),
    },
    preySlot: getNormalizeBoolean(),
    huntingSlot: getNormalizeBoolean(),
    charmInfo: {
      expansion: getNormalizeBoolean(),
      total: Math.floor(Math.random() * 500),
    },
    gems: { lesser: getGem(), greater: getGem(), regular: getGem() },
    greaterGems: getNormalizedArray(data.greaterGems),
    animusMasteries: Math.floor(Math.random() * 50),
  }

  nextServer = data.serverData.serverName

  return normalized
}

export function normalizeData(
  filterResponse: FilterResponse,
  paginationData: PaginationOptions,
): FilterResponse {
  if (paginationData.pageSize <= 10) return filterResponse
  if (paginationData.pageSize === 50) return filterResponse

  return { ...filterResponse, page: filterResponse.page.map(normalize) }
}
