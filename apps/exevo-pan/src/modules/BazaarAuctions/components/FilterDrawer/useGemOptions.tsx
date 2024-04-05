import { useMemo } from 'react'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { vocationGemOptions } from './gemOptions'

export const useGemOptions = (vocationSet: FilterOptions['vocation']) =>
  useMemo(() => {
    if (vocationSet.has(vocation.VOCATION_IDS.KNIGHT)) {
      return vocationGemOptions.knight
    }
    if (vocationSet.has(vocation.VOCATION_IDS.PALADIN)) {
      return vocationGemOptions.paladin
    }
    if (vocationSet.has(vocation.VOCATION_IDS.SORCERER)) {
      return vocationGemOptions.sorcerer
    }
    if (vocationSet.has(vocation.VOCATION_IDS.DRUID)) {
      return vocationGemOptions.druid
    }
    if (vocationSet.has(vocation.VOCATION_IDS.NONE)) {
      return []
    }

    return [
      ...vocationGemOptions.rook,
      ...vocationGemOptions.knight,
      ...vocationGemOptions.sorcerer,
      ...vocationGemOptions.druid,
    ]
  }, [vocationSet])
