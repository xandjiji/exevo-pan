import { dictionaryFactory } from '../utils'

export const tokens = [
  'id',
  'nickname',
  'auctionEnd',
  'currentBid',
  'hasBeenBidded',
  'outfitId',
  'serverId',
  'vocationId',
  'level',
  'skills',
  'items',
  'charms',
  'transfer',
  'imbuements',
  'quests',
  'outfits',
  'mounts',
  'rareAchievements',
]

export const dictionary = dictionaryFactory(tokens)
