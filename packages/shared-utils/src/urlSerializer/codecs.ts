export const encode = {
  BooleanSet: (set: Set<boolean>): string => [...set].join(','),
  NumberSet: (set: Set<number>): string => [...set].join(','),
  StringSet: (set: Set<string>): string =>
    [...set].map(encodeURIComponent).join(','),
}

const decodeBoolean = (encodedValue: string): boolean => encodedValue === 'true'

export const decode = {
  Boolean: decodeBoolean,
  Number,
  BooleanSet: (encodedValue: string): Set<boolean> =>
    new Set(decodeURIComponent(encodedValue).split(',').map(decodeBoolean)),
  NumberSet: (encodedValue: string): Set<number> =>
    new Set(decodeURIComponent(encodedValue).split(',').map(Number)),
  StringSet: (encodedValue: string): Set<string> =>
    new Set(decodeURIComponent(encodedValue).split(',')),
}
