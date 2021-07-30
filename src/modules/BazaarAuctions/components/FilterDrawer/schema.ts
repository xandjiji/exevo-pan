/* @ ToDo: move this to urlParametersState utils export */
const encodeSet = (set: Set<boolean | number | string>): string =>
  [...set].join(',')
const decodeSet = (
  encodedValue: string,
  valueType: 'boolean' | 'number' | 'string',
): Set<boolean | number | string> =>
  new Set<boolean | number | string>(
    decodeURIComponent(encodedValue)
      .split(',')
      .map(stringValue => {
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

export const filterSchema = [
  {
    key: 'nicknameFilter',
    defaultValue: '',
    encode: encodeURIComponent,
    decode: decodeURIComponent,
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
    encode: encodeURIComponent,
    decode: decodeURIComponent,
  },
  {
    key: 'maxLevel',
    defaultValue: 2000,
    encode: encodeURIComponent,
    decode: decodeURIComponent,
  },
  {
    key: 'minSkill',
    defaultValue: 10,
    encode: encodeURIComponent,
    decode: decodeURIComponent,
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
    key: 'itemSet',
    defaultValue: new Set<string>([]),
    encode: encodeSet,
    decode: decodeStringSet,
  },
  {
    key: 'fav',
    defaultValue: false,
    encode: encodeURIComponent,
    decode: decodeURIComponent,
  },
  {
    key: 'rareNick',
    defaultValue: false,
    encode: encodeURIComponent,
    decode: decodeURIComponent,
  },
  {
    key: 'soulwarFilter',
    defaultValue: false,
    encode: encodeURIComponent,
    decode: decodeURIComponent,
  },
]
