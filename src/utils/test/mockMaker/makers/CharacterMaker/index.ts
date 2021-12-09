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
import { samplesFrom } from '../../utils'
import { randomServerId } from '../serverMaker'
import {
  randomOutfitId,
  randomOutfits,
  randomStoreOutfits,
} from './randomOutfit'

export const randomCharacter = (): PartialCharacterObject => {
  const sex = faker.datatype.boolean()

  return {
    id: faker.datatype.number({ min: 0, max: 999999999 }),
    nickname: `${faker.name.firstName()} ${faker.name.lastName()}`,
    auctionEnd: Math.trunc(+faker.date.future() / 1000),
    currentBid: faker.datatype.number({ min: 57, max: 300000 }),
    hasBeenBidded: faker.datatype.boolean(),
    transfer: faker.datatype.boolean(),
    sex,
    outfitId: randomOutfitId(sex),
    serverId: randomServerId(),
    vocationId: faker.datatype.number({ min: 0, max: 4 }),
    level: faker.datatype.number({ min: 8, max: 2000 }),
    skills: {
      magic: faker.datatype.float({ min: 10, max: 130, precision: 0.01 }),
      club: faker.datatype.float({ min: 10, max: 130, precision: 0.01 }),
      fist: faker.datatype.float({ min: 10, max: 130, precision: 0.01 }),
      sword: faker.datatype.float({ min: 10, max: 130, precision: 0.01 }),
      fishing: faker.datatype.float({ min: 10, max: 130, precision: 0.01 }),
      axe: faker.datatype.float({ min: 10, max: 130, precision: 0.01 }),
      distance: faker.datatype.float({ min: 10, max: 130, precision: 0.01 }),
      shielding: faker.datatype.float({ min: 10, max: 130, precision: 0.01 }),
    },
    items: Array.from({ length: 4 }, () =>
      faker.datatype.number({ min: 3100, max: 3400 }),
    ).slice(faker.datatype.number({ min: 0, max: 4 })),
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
