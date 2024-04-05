import { useMemo } from 'react'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'

import { greaterGems } from 'data-dictionary/dist/dictionaries/gems'

const buildOption = (value: string): Option => ({ name: value, value })

const sharedGems = [
  greaterGems.knight['+1.5% Critical Extra Damage'],
  greaterGems.knight['+0.25% Dodge'],
  greaterGems.knight['+1.2% Life Leech'],
  greaterGems.knight['+0.4% Mana Leech'],
]

const sharedSet = new Set(sharedGems)

const allOptions = [
  ...new Set([
    ...sharedGems,
    ...Object.keys(greaterGems.knight),
    ...Object.keys(greaterGems.paladin),
    ...Object.keys(greaterGems.sorcerer),
    ...Object.keys(greaterGems.druid),
  ]),
].map(buildOption)

const toVocationOption = (gems: string[]) =>
  gems.filter((gem) => !sharedSet.has(gem)).map(buildOption)

const vocationGemOptions = {
  rook: [],
  knight: toVocationOption(Object.keys(greaterGems.knight)),
  paladin: toVocationOption(Object.keys(greaterGems.paladin)),
  sorcerer: toVocationOption(Object.keys(greaterGems.sorcerer)),
  druid: toVocationOption(Object.keys(greaterGems.druid)),
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

    return [...new Set([...sharedGems.map(buildOption), ...filteredOptions])]
  }, [vocationSet])
