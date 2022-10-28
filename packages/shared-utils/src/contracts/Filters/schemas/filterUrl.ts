import { DEFAULT_FILTER_OPTIONS } from '../defaults'

/* @ ToDo: remove this file */

const encodeSet = (set: Set<boolean | number | string>): string =>
  [...set].join(',')
const decodeSet = (
  encodedValue: string,
  valueType: 'boolean' | 'number' | 'string',
): Set<boolean | number | string> =>
  new Set<boolean | number | string>(
    decodeURIComponent(encodedValue)
      .split(',')
      .map((stringValue) => {
        if (valueType === 'number') return Number(stringValue)
        if (valueType === 'boolean') return stringValue === 'true'
        return stringValue
      }),
  )

const decodeBooleanSet = (encodedValue: string): Set<boolean> =>
  decodeSet(encodedValue, 'boolean') as Set<boolean>
const decodeNumberSet = (encodedValue: string): Set<number> =>
  decodeSet(encodedValue, 'number') as Set<number>
const decodeStringSet = (encodedValue: string): Set<string> =>
  decodeSet(encodedValue, 'string') as Set<string>

const decodeNumber = (encodedValue: string): number => Number(encodedValue)
const decodeBoolean = (encodedValue: string): boolean => encodedValue === 'true'

export const filterSchema = [
  {
    key: 'auctionIds',
    defaultValue: DEFAULT_FILTER_OPTIONS.auctionIds,
    encode: encodeSet,
    decode: decodeNumberSet,
  },
  {
    key: 'nicknameFilter',
    defaultValue: DEFAULT_FILTER_OPTIONS.nicknameFilter,
  },
  {
    key: 'vocation',
    defaultValue: DEFAULT_FILTER_OPTIONS.vocation,
    encode: encodeSet,
    decode: decodeNumberSet,
  },
  {
    key: 'pvp',
    defaultValue: DEFAULT_FILTER_OPTIONS.pvp,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'battleye',
    defaultValue: DEFAULT_FILTER_OPTIONS.battleye,
    encode: encodeSet,
    decode: decodeBooleanSet,
  },
  {
    key: 'location',
    defaultValue: DEFAULT_FILTER_OPTIONS.location,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'serverSet',
    defaultValue: DEFAULT_FILTER_OPTIONS.serverSet,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'tags',
    defaultValue: DEFAULT_FILTER_OPTIONS.tags,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'minLevel',
    defaultValue: DEFAULT_FILTER_OPTIONS.minLevel,
    decode: decodeNumber,
  },
  {
    key: 'maxLevel',
    defaultValue: DEFAULT_FILTER_OPTIONS.maxLevel,
    decode: decodeNumber,
  },
  {
    key: 'minSkill',
    defaultValue: DEFAULT_FILTER_OPTIONS.minSkill,
    decode: decodeNumber,
  },
  {
    key: 'maxSkill',
    defaultValue: DEFAULT_FILTER_OPTIONS.maxSkill,
    decode: decodeNumber,
  },
  {
    key: 'bossPoints',
    defaultValue: DEFAULT_FILTER_OPTIONS.bossPoints,
    decode: decodeNumber,
  },
  {
    key: 'tcInvested',
    defaultValue: DEFAULT_FILTER_OPTIONS.tcInvested,
    decode: decodeNumber,
  },
  {
    key: 'addon',
    defaultValue: DEFAULT_FILTER_OPTIONS.addon,
    decode: decodeNumber,
  },
  {
    key: 'sex',
    defaultValue: DEFAULT_FILTER_OPTIONS.sex,
    decode: decodeBoolean,
  },
  {
    key: 'skillKey',
    defaultValue: DEFAULT_FILTER_OPTIONS.skillKey,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'imbuementsSet',
    defaultValue: DEFAULT_FILTER_OPTIONS.imbuementsSet,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'charmsSet',
    defaultValue: DEFAULT_FILTER_OPTIONS.charmsSet,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'questSet',
    defaultValue: DEFAULT_FILTER_OPTIONS.questSet,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'outfitSet',
    defaultValue: DEFAULT_FILTER_OPTIONS.outfitSet,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'storeOutfitSet',
    defaultValue: DEFAULT_FILTER_OPTIONS.storeOutfitSet,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'mountSet',
    defaultValue: DEFAULT_FILTER_OPTIONS.mountSet,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'storeMountSet',
    defaultValue: DEFAULT_FILTER_OPTIONS.storeMountSet,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'achievementSet',
    defaultValue: DEFAULT_FILTER_OPTIONS.achievementSet,
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'charmExpansion',
    defaultValue: DEFAULT_FILTER_OPTIONS.charmExpansion,
    decode: decodeBoolean,
  },
  {
    key: 'preySlot',
    defaultValue: DEFAULT_FILTER_OPTIONS.preySlot,
    decode: decodeBoolean,
  },
  {
    key: 'huntingSlot',
    defaultValue: DEFAULT_FILTER_OPTIONS.huntingSlot,
    decode: decodeBoolean,
  },
  {
    key: 'rewardShrine',
    defaultValue: DEFAULT_FILTER_OPTIONS.rewardShrine,
    decode: decodeBoolean,
  },
  {
    key: 'imbuementShrine',
    defaultValue: DEFAULT_FILTER_OPTIONS.imbuementShrine,
    decode: decodeBoolean,
  },
  {
    key: 'dummy',
    defaultValue: DEFAULT_FILTER_OPTIONS.dummy,
    decode: decodeBoolean,
  },

  {
    key: 'mailbox',
    defaultValue: DEFAULT_FILTER_OPTIONS.mailbox,
    decode: decodeBoolean,
  },
  {
    key: 'goldPouch',
    defaultValue: DEFAULT_FILTER_OPTIONS.goldPouch,
    decode: decodeBoolean,
  },
  {
    key: 'hireling',
    defaultValue: DEFAULT_FILTER_OPTIONS.hireling,
    decode: decodeBoolean,
  },
  {
    key: 'transferAvailable',
    defaultValue: DEFAULT_FILTER_OPTIONS.transferAvailable,
    decode: decodeBoolean,
  },
  {
    key: 'biddedOnly',
    defaultValue: DEFAULT_FILTER_OPTIONS.biddedOnly,
    decode: decodeBoolean,
  },
  {
    key: 'rareItemSet',
    defaultValue: DEFAULT_FILTER_OPTIONS.rareItemSet,
    encode: encodeSet,
    decode: decodeStringSet,
  },
]
