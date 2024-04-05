import { useMemo } from 'react'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'

import { greaterGems } from 'data-dictionary/dist/dictionaries/gems'

const buildOption = (value: string): Option => ({ name: value, value })

const allOptions = [
  ...new Set([
    greaterGems.knight['+1.5% Critical Extra Damage'],
    greaterGems.knight['+0.25% Dodge'],
    greaterGems.knight['+1.2% Life Leech'],
    greaterGems.knight['+0.4% Mana Leech'],
    ...Object.keys(greaterGems.knight),
    ...Object.keys(greaterGems.paladin),
    ...Object.keys(greaterGems.sorcerer),
    ...Object.keys(greaterGems.druid),
  ]),
].map(buildOption)

export const vocationGemOptions = {
  rook: [],
  knight: Object.keys(greaterGems.knight).map(buildOption),
  sorcerer: Object.keys(greaterGems.sorcerer).map(buildOption),
  druid: Object.keys(greaterGems.druid).map(buildOption),
  paladin: Object.keys(greaterGems.paladin).map(buildOption),
}

export const useGemOptions = (vocationSet: FilterOptions['vocation']) =>
  useMemo(() => {
    if (vocationSet.size === 0) return allOptions

    let filteredOptions: Option[] = []
    if (vocationSet.has(vocation.VOCATION_IDS.KNIGHT)) {
      filteredOptions = [...filteredOptions, ...vocationGemOptions.knight]
    }
    if (vocationSet.has(vocation.VOCATION_IDS.PALADIN)) {
      filteredOptions = [...filteredOptions, ...vocationGemOptions.paladin]
    }
    if (vocationSet.has(vocation.VOCATION_IDS.SORCERER)) {
      filteredOptions = [...filteredOptions, ...vocationGemOptions.sorcerer]
    }
    if (vocationSet.has(vocation.VOCATION_IDS.DRUID)) {
      filteredOptions = [...filteredOptions, ...vocationGemOptions.druid]
    }

    return [...new Set(filteredOptions)]
  }, [vocationSet])
