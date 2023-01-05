import { createContext, useContext, useState } from 'react'
import * as options from './options'
import { buildOption } from './utils'
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
}

const DrawerFieldsContext =
  createContext<DrawerFieldsContextData>(DEFAULT_STATE)

export const DrawerFieldsProvider = ({
  children,
  ...serverProps
}: DrawerFieldsProviderProps) => {
  const [serverOptions] = useState<Option[]>(() =>
    Object.keys(serverProps.serverData).map(buildOption),
  )
  return (
    <DrawerFieldsContext.Provider
      value={{ ...serverProps, ...options, serverOptions }}
    >
      {children}
    </DrawerFieldsContext.Provider>
  )
}

export const useDrawerFields = (): DrawerFieldsContextData =>
  useContext(DrawerFieldsContext)
