import { createContext, useContext } from 'react'
import * as options from './options'
import { DrawerFieldsContextData, DrawerFieldsProviderProps } from './types'

const DEFAULT_STATE: DrawerFieldsContextData = {
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
}: DrawerFieldsProviderProps) => (
  <DrawerFieldsContext.Provider value={{ ...serverProps, ...options }}>
    {children}
  </DrawerFieldsContext.Provider>
)

export const useDrawerFields = (): DrawerFieldsContextData =>
  useContext(DrawerFieldsContext)
