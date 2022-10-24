import React from 'react'

export interface DrawerFieldsContextData {
  serverOptions: Option[]
  rareItemOptions: Option[]
  imbuementOptions: Option[]
  charmOptions: Option[]
  questOptions: Option[]
  achievementOptions: Option[]
  outfitValues: string[]
  storeOutfitValues: string[]
  mountValues: string[]
  storeMountValues: string[]
}

type ServerSideProps = Pick<
  DrawerFieldsContextData,
  'serverOptions' | 'rareItemOptions'
>

export interface DrawerFieldsProviderProps extends ServerSideProps {
  children: React.ReactNode
}
