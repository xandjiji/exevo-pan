import { randomDataset } from 'utils/test'

const { minifiedCharacterData, partialCharacterData } = randomDataset()

const past = +new Date() / 1000 - 100000
const future = +new Date() / 1000 + 100000

minifiedCharacterData[0][2] = past
export const pastMiniAuction = minifiedCharacterData[0]

minifiedCharacterData[1][2] = future
export const futureMiniAuction = minifiedCharacterData[1]

export const pastPartialAuction = {
  ...partialCharacterData[0],
  auctionEnd: past,
}

export const futurePartialAuction = {
  ...partialCharacterData[1],
  auctionEnd: future,
}
/* export const futurePartialAuction = {
  id: 548069,
  nickname: 'Future auction',
  auctionEnd: future,
  currentBid: 5011,
  hasBeenBidded: true,
  outfitId: '146_3',
  serverId: 31,
  vocationId: 1,
  level: 502,
  skills: {
    magic: 11.09,
    club: 44.25,
    fist: 14.15,
    sword: 55.19,
    fishing: 10.15,
    axe: 114.66,
    distance: 26.95,
    shielding: 107.27,
  },
  items: [16110, 16161, 21892, 31633],
  charms: ['Dodge', 'Freeze', 'Zap'],
  transfer: false,
  imbuements: [
    'Axe Skill',
    'Club Skill',
    'Critical Hit',
    'Death Damage',
    'Death Protection',
    'Earth Damage',
    'Earth Protection',
    'Energy Damage',
    'Energy Protection',
    'Fire Damage',
    'Fire Protection',
    'Life Leech',
    'Magic Level',
    'Mana Leech',
    'Speed',
    'Sword Skill',
  ],
  hasSoulwar: false,
} as CharacterObject */
