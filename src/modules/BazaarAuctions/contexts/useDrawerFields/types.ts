import React from 'react'

export interface DrawerFieldsContextData {
  serverOptions: Option[]
  auctionedItemOptions: Option[]
}

export interface DrawerFieldsProviderProps extends DrawerFieldsContextData {
  children: React.ReactNode
}
