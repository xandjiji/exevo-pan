import { createContext, useContext } from 'react'
import * as options from './options'
import { DrawerFieldsContextData, DrawerFieldsProviderProps } from './types'

const DEFAULT_STATE: DrawerFieldsContextData = {
  serverOptions: [],
  rareItemOptions: [],
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
  serverOptions,
  rareItemOptions,
  children,
}: DrawerFieldsProviderProps) => (
  <DrawerFieldsContext.Provider
    value={{ serverOptions, rareItemOptions, ...options }}
  >
    {children}
  </DrawerFieldsContext.Provider>
)

export const useDrawerFields = (): DrawerFieldsContextData =>
  useContext(DrawerFieldsContext)
