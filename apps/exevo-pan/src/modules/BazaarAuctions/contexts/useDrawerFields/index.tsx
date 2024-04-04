import { createContext, useContext, useState } from 'react'
import { greaterGems } from 'data-dictionary/dist/dictionaries/gems'
import * as options from './options'
import { buildOption, sortOptions } from './utils'
import { DrawerFieldsContextData, DrawerFieldsProviderProps } from './types'

const DEFAULT_STATE: DrawerFieldsContextData = {
  serverData: {},
  activeServers: new Set(),
  serverOptions: [],
  rareItemData: {},
  imbuementOptions: [],
  charmOptions: [],
  questOptions: [],
  achievementOptions: [],
  outfitValues: [],
  storeOutfitValues: [],
  mountValues: [],
  storeMountValues: [],
  gemOptions: {
    rook: [],
    knight: [],
    sorcerer: [],
    druid: [],
    paladin: [],
  },
}

const DrawerFieldsContext =
  createContext<DrawerFieldsContextData>(DEFAULT_STATE)

const gemOptions: DrawerFieldsContextData['gemOptions'] = {
  rook: [],
  knight: Object.keys(greaterGems.knight).map(buildOption),
  sorcerer: Object.keys(greaterGems.sorcerer).map(buildOption),
  druid: Object.keys(greaterGems.druid).map(buildOption),
  paladin: Object.keys(greaterGems.paladin).map(buildOption),
}

export const DrawerFieldsProvider = ({
  children,
  ...serverProps
}: DrawerFieldsProviderProps) => {
  const [serverOptions] = useState<Option[]>(() =>
    Object.keys(serverProps.serverData).map(buildOption).sort(sortOptions),
  )

  return (
    <DrawerFieldsContext.Provider
      value={{ ...serverProps, ...options, serverOptions, gemOptions }}
    >
      {children}
    </DrawerFieldsContext.Provider>
  )
}

export const useDrawerFields = (): DrawerFieldsContextData =>
  useContext(DrawerFieldsContext)
