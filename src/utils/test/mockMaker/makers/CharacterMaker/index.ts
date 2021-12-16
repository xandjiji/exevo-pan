// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker'
import {
  charm,
  imbuement,
  quest,
  rareAchievement,
  mount,
  storeMount,
} from 'DataDictionary/dictionaries'
import { auctions } from '../../constants'
import { samplesFrom } from '../../utils'
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
    items: Array.from({ length: auctions.items.size.MAX }, () =>
      faker.datatype.number({
        min: auctions.items.id.MIN,
        max: auctions.items.id.MAX,
      }),
    ).slice(
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
  }
}
