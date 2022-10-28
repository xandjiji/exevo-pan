import * as faker from 'faker'
import {
  charm,
  imbuement,
  quest,
  rareAchievement,
  mount,
  storeMount,
  store,
  tag,
  rareItem,
} from 'data-dictionary/dist/dictionaries'
import { auctions } from '../../constants'
import {
  samplesFrom,
  randomChance,
  randomRange,
  randomArrayFrom,
} from '../../utils'
import { randomServer } from '../serverMaker'
import {
  randomOutfitId,
  randomOutfits,
  randomStoreOutfits,
} from './randomOutfit'

export const randomAuctionId = (): number => randomRange(auctions.id)

export const randomSkillValue = (): number => randomRange(auctions.skills)

export const randomItem = (): number => {
  const itemId = randomRange(auctions.items.id)

  const hasTier = randomChance(auctions.items.tier.CHANCE)
  if (hasTier) {
    const tier = randomRange(auctions.items.tier)

    return itemId + tier / 10
  }

  return itemId
}

const randomCharacterItems = (): CharacterItem[] =>
  samplesFrom(store.scrapingTokens, randomRange(auctions.storeItem.array)).map(
    (name) => ({
      name,
      amount: randomRange(auctions.storeItem.amount),
    }),
  )

const randomCharmInfo = (): CharmInfo => {
  const spent = randomRange(auctions.charmInfo.spent)
  const unspent = randomRange(auctions.charmInfo.unspent)

  return {
    expansion: faker.datatype.boolean(),
    total: spent + unspent,
    unspent,
  }
}

const randomHirelingsInfo = (): HirelingsInfo => {
  const count = randomRange(auctions.hirelings.count)
  const hasHireling = count > 0

  return {
    count,
    jobs: hasHireling ? randomRange(auctions.hirelings.jobs) : 0,
    outfits: hasHireling ? randomRange(auctions.hirelings.outfits) : 0,
  }
}

const server = randomServer()

export const randomCharacter = (): CharacterObject => {
  const sex = faker.datatype.boolean()

  return {
    id: randomAuctionId(),
    nickname: `${faker.name.firstName()} ${faker.name.lastName()}`,
    auctionEnd: Math.trunc(+faker.date.future() / 1000),
    currentBid: randomRange(auctions.currentBid),
    hasBeenBidded: faker.datatype.boolean(),
    transfer: faker.datatype.boolean(),
    sex,
    outfitId: randomOutfitId(sex),
    vocationId: randomRange(auctions.vocationId),
    level: randomRange(auctions.level),
    skills: {
      magic: randomSkillValue(),
      club: randomSkillValue(),
      fist: randomSkillValue(),
      sword: randomSkillValue(),
      fishing: randomSkillValue(),
      axe: randomSkillValue(),
      distance: randomSkillValue(),
      shielding: randomSkillValue(),
    },
    items: randomArrayFrom(auctions.items.array, randomItem),
    charms: samplesFrom(charm.tokens),
    imbuements: samplesFrom(imbuement.tokens),
    quests: samplesFrom(quest.tokens),
    rareAchievements: samplesFrom(rareAchievement.tokens),
    tcInvested: randomRange(auctions.tcInvested),
    bossPoints: randomRange(auctions.bossPoints),
    tags: samplesFrom(Object.values(tag) as unknown as string[]),
    mounts: samplesFrom(mount.tokens),
    storeMounts: samplesFrom(storeMount.tokens),
    outfits: randomOutfits(),
    storeOutfits: randomStoreOutfits(),
    storeItems: randomCharacterItems(),
    achievementPoints: randomRange(auctions.achievementPoints),
    preySlot: faker.datatype.boolean(),
    huntingSlot: faker.datatype.boolean(),
    charmInfo: randomCharmInfo(),
    hirelings: randomHirelingsInfo(),
    server,
    serverName: server.serverName,
    rareItems: samplesFrom(Object.values(rareItem)),
  }
}
