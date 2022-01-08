import {
  imbuement,
  charm,
  quest,
  rareAchievement,
  outfit,
  storeOutfit,
  mount,
  storeMount,
} from 'data-dictionary/dist/dictionaries'
import { buildOption } from './utils'

export const imbuementOptions = imbuement.tokens.map(buildOption)
export const charmOptions = charm.tokens.map(buildOption)
export const questOptions = quest.tokens.map(buildOption)
export const achievementOptions = rareAchievement.tokens.map(buildOption)

export const outfitValues = outfit.tokens
export const mountValues = mount.tokens

export const storeOutfitValues = storeOutfit.tokens
export const storeMountValues = storeMount.tokens
