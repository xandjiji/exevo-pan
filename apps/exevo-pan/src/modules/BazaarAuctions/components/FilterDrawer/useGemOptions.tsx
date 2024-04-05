import { useMemo } from 'react'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { vocationGemOptions } from './gemOptions'

export const useGemOptions = (vocationSet: FilterOptions['vocation']) =>
  useMemo(() => {
    let options: Option[] = []

    if (vocationSet.has(vocation.VOCATION_IDS.NONE)) {
      options = [...vocationGemOptions.rook]
    }
    if (vocationSet.has(vocation.VOCATION_IDS.KNIGHT)) {
      options = [...options, ...vocationGemOptions.knight]
    }
    if (vocationSet.has(vocation.VOCATION_IDS.PALADIN)) {
      options = [...options, ...vocationGemOptions.paladin]
    }
    if (vocationSet.has(vocation.VOCATION_IDS.SORCERER)) {
      options = [...options, ...vocationGemOptions.sorcerer]
    }
    if (vocationSet.has(vocation.VOCATION_IDS.DRUID)) {
      options = [...options, ...vocationGemOptions.druid]
    }

    return options
  }, [vocationSet])
