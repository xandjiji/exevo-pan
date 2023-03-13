import { constTokens as bossTokens } from 'data-dictionary/dist/dictionaries/bosses'

const SEPARATOR = '!@@!'

export const utils = {
  split: (joinedString: string): Set<string> =>
    new Set(joinedString.split(SEPARATOR).filter(Boolean)),
  join: (set: Set<string>): string => [...set].filter(Boolean).join(SEPARATOR),
}

export const bossNames = Object.values(bossTokens)
export const bossSet = new Set<string>(bossNames)
