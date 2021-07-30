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

/* @ ToDo: fix this typings */
/* type PossibleTypes = FilterState[keyof FilterState] */
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
]

/* const defaultFilterState = {
  nicknameFilter: '',
  vocation: new Set([]),
  pvp: new Set([]),
  battleye: new Set([]),
  location: new Set([]),
  serverSet: new Set([]),
  minLevel: 8,
  maxLevel: 2000,
  minSkill: 10,
  skillKey: new Set([]),
  itemSet: new Set([]),
  fav: false,
  rareNick: false,
  soulwarFilter: false,
  imbuementsSet: new Set([]),
} */
