import * as faker from 'faker'
import {
  charm,
  imbuement,
  quest,
  rareAchievement,
  mount,
  storeMount,
} from 'data-dictionary/dist/dictionaries'
import { auctions } from '../../constants'
import {
  samplesFrom,
  randomChance,
  randomQuantity,
  randomArrayFrom,
} from '../../utils'
import { randomServerId } from '../serverMaker'
import {
  randomOutfitId,
  randomOutfits,
  randomStoreOutfits,
} from './randomOutfit'

export const randomAuctionId = (): number =>
  faker.datatype.number({ min: auctions.id.MIN, max: auctions.id.MAX })

export const randomSkillValue = (): number =>
  faker.datatype.float({
    min: auctions.skills.MIN,
    max: auctions.skills.MAX,
    precision: auctions.skills.PRECISION,
  })

export const randomItem = (): number => {
  const itemId = faker.datatype.number({
    min: auctions.items.id.MIN,
    max: auctions.items.id.MAX,
  })

  const hasTier = randomChance(0.1)
  if (hasTier) {
    const tier = faker.datatype.number({
      min: auctions.items.tier.MIN,
      max: auctions.items.tier.MAX,
    })

    return itemId + tier / 10
  }

  return itemId
}

const randomCharacterItem = (): CharacterItem => ({
  name: faker.lorem.words(randomQuantity({ min: 2, max: 4 })),
  amount: randomQuantity(auctions.storeItem.amount),
})

const randomCharmInfo = (): CharmInfo => {
  const spent = randomQuantity(auctions.charmInfo.spent)
  const unspent = randomQuantity(auctions.charmInfo.unspent)

  return {
    expansion: faker.datatype.boolean(),
    total: spent + unspent,
    unspent,
  }
}

const randomHirelingsInfo = (): HirelingsInfo => {
  const count = randomQuantity(auctions.hirelings.count)
  const hasHireling = count > 0

  return {
    count,
    jobs: hasHireling ? randomQuantity(auctions.hirelings.jobs) : 0,
    outfits: hasHireling ? randomQuantity(auctions.hirelings.outfits) : 0,
  }
}

export const randomCharacter = (): PartialCharacterObject => {
  const sex = faker.datatype.boolean()

  return {
    id: randomAuctionId(),
    nickname: `${faker.name.firstName()} ${faker.name.lastName()}`,
    auctionEnd: Math.trunc(+faker.date.future() / 1000),
    currentBid: faker.datatype.number({
      min: auctions.currentBid.MIN,
      max: auctions.currentBid.MAX,
    }),
    hasBeenBidded: faker.datatype.boolean(),
    transfer: faker.datatype.boolean(),
    sex,
    outfitId: randomOutfitId(sex),
    serverId: randomServerId(),
    vocationId: faker.datatype.number({
      min: auctions.vocationId.MIN,
      max: auctions.vocationId.MAX,
    }),
    level: faker.datatype.number({
      min: auctions.level.MIN,
      max: auctions.level.MAX,
    }),
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
    items: Array.from({ length: auctions.items.size.MAX }, randomItem).slice(
      faker.datatype.number({
        min: auctions.items.size.MIN,
        max: auctions.items.size.MAX,
      }),
    ),
    charms: samplesFrom(charm.tokens),
    imbuements: samplesFrom(imbuement.tokens),
    quests: samplesFrom(quest.tokens),
    rareAchievements: samplesFrom(rareAchievement.tokens),
    mounts: samplesFrom(mount.tokens),
    storeMounts: samplesFrom(storeMount.tokens),
    outfits: randomOutfits(),
    storeOutfits: randomStoreOutfits(),
    storeItems: randomArrayFrom(auctions.storeItem.array, randomCharacterItem),
    achievementPoints: randomQuantity(auctions.achievementPoints),
    preySlot: faker.datatype.boolean(),
    huntingSlot: faker.datatype.boolean(),
    charmInfo: randomCharmInfo(),
    hirelings: randomHirelingsInfo(),
  }
}
