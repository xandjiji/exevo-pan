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
    key: 'nicknameFilter',
    defaultValue: '',
  },
  {
    key: 'vocation',
    defaultValue: new Set<0 | 1 | 2 | 3 | 4>([]),
    encode: encodeSet,
    decode: decodeNumberSet,
  },
  {
    key: 'pvp',
    defaultValue: new Set<0 | 1 | 2 | 3 | 4>([]),
    encode: encodeSet,
    decode: decodeNumberSet,
  },
  {
    key: 'battleye',
    defaultValue: new Set<boolean>([]),
    encode: encodeSet,
    decode: decodeBooleanSet,
  },
  {
    key: 'location',
    defaultValue: new Set<0 | 1 | 2>([]),
    encode: encodeSet,
    decode: decodeNumberSet,
  },
  {
    key: 'serverSet',
    defaultValue: new Set<string>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'minLevel',
    defaultValue: 8,
    decode: decodeNumber,
  },
  {
    key: 'maxLevel',
    defaultValue: 2000,
    decode: decodeNumber,
  },
  {
    key: 'minSkill',
    defaultValue: 10,
    decode: decodeNumber,
  },
  {
    key: 'maxSkill',
    defaultValue: 150,
    decode: decodeNumber,
  },
  {
    key: 'addon',
    defaultValue: 3,
    decode: decodeNumber,
  },
  {
    key: 'sex',
    defaultValue: false,
    decode: decodeBoolean,
  },
  {
    key: 'skillKey',
    defaultValue: new Set<'axe' | 'club' | 'distance' | 'magic' | 'sword'>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'imbuementsSet',
    defaultValue: new Set<string>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'charmsSet',
    defaultValue: new Set<string>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'itemSet',
    defaultValue: new Set<string>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'rareNick',
    defaultValue: false,
    decode: decodeBoolean,
  },
  {
    key: 'questSet',
    defaultValue: new Set<string>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'outfitSet',
    defaultValue: new Set<string>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'storeOutfitSet',
    defaultValue: new Set<string>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'mountSet',
    defaultValue: new Set<string>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'storeMountSet',
    defaultValue: new Set<string>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'achievementSet',
    defaultValue: new Set<string>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'soulwarAvailable',
    defaultValue: false,
    decode: decodeBoolean,
  },
]
