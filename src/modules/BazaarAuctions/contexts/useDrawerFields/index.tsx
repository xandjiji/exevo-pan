import { createContext, useContext } from 'react'
import { DrawerFieldsContextData, DrawerFieldsProviderProps } from './types'

const DEFAULT_STATE: DrawerFieldsContextData = {
  serverOptions: [],
  auctionedItemOptions: [],
}

const DrawerFieldsContext =
  createContext<DrawerFieldsContextData>(DEFAULT_STATE)

export const DrawerFieldsProvider = ({
  serverOptions,
  auctionedItemOptions,
  children,
}: DrawerFieldsProviderProps): JSX.Element => (
  <DrawerFieldsContext.Provider value={{ serverOptions, auctionedItemOptions }}>
    {children}
  </DrawerFieldsContext.Provider>
)

export const useDrawerFields = (): DrawerFieldsContextData =>
  useContext(DrawerFieldsContext)
