import { useMemo } from 'react'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { vocationGemOptions } from './gemOptions'

const allOptions = [
  ...vocationGemOptions.rook,
  ...vocationGemOptions.knight,
  ...vocationGemOptions.sorcerer,
  ...vocationGemOptions.druid,
]

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

    return filteredOptions
  }, [vocationSet])
