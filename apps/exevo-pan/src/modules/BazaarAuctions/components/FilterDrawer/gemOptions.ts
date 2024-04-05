import { greaterGems } from 'data-dictionary/dist/dictionaries/gems'

const buildOption = (value: string): Option => ({ name: value, value })

export const vocationGemOptions = {
  rook: [],
  knight: Object.keys(greaterGems.knight).map(buildOption),
  sorcerer: Object.keys(greaterGems.sorcerer).map(buildOption),
  druid: Object.keys(greaterGems.druid).map(buildOption),
  paladin: Object.keys(greaterGems.paladin).map(buildOption),
}
