import { useMemo } from 'react'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'

import {
  sharedGreaterGems,
  vocationGreaterGems,
} from 'data-dictionary/dist/dictionaries/gems'

const buildOption = (value: string): Option => ({ name: value, value })

const sharedGems = Object.values(sharedGreaterGems)

const allOptions = [
  ...new Set([
    ...sharedGems,
    ...Object.keys(vocationGreaterGems.knight),
    ...Object.keys(vocationGreaterGems.paladin),
    ...Object.keys(vocationGreaterGems.sorcerer),
    ...Object.keys(vocationGreaterGems.druid),
    ...Object.keys(vocationGreaterGems.monk),
  ]),
].map(buildOption)

const vocationGemOptions = {
  rook: [],
  knight: Object.keys(vocationGreaterGems.knight).map(buildOption),
  paladin: Object.keys(vocationGreaterGems.paladin).map(buildOption),
  sorcerer: Object.keys(vocationGreaterGems.sorcerer).map(buildOption),
  druid: Object.keys(vocationGreaterGems.druid).map(buildOption),
  monk: Object.keys(vocationGreaterGems.monk).map(buildOption),
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
    if (vocationSet.has(vocation.VOCATION_IDS.MONK)) {
      filteredOptions = [...filteredOptions, ...vocationGemOptions.monk]
    }
    return [...new Set([...sharedGems.map(buildOption), ...filteredOptions])]
  }, [vocationSet])
