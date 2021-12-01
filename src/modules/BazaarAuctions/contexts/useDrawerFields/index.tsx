import { createContext, useContext } from 'react'
import { imbuementOptions } from './options'
import { DrawerFieldsContextData, DrawerFieldsProviderProps } from './types'

const DEFAULT_STATE: DrawerFieldsContextData = {
  serverOptions: [],
  auctionedItemOptions: [],
  imbuementOptions: [],
}

const DrawerFieldsContext =
  createContext<DrawerFieldsContextData>(DEFAULT_STATE)

export const DrawerFieldsProvider = ({
  serverOptions,
  auctionedItemOptions,
  children,
}: DrawerFieldsProviderProps): JSX.Element => (
  <DrawerFieldsContext.Provider
    value={{ serverOptions, auctionedItemOptions, imbuementOptions }}
  >
    {children}
  </DrawerFieldsContext.Provider>
)

export const useDrawerFields = (): DrawerFieldsContextData =>
  useContext(DrawerFieldsContext)
