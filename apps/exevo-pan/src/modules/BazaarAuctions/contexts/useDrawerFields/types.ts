import React from 'react'

export interface DrawerFieldsContextData {
  serverOptions: Option[]
  rareItemData: RareItemData
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
  'serverOptions' | 'rareItemData'
>

export interface DrawerFieldsProviderProps extends ServerSideProps {
  children: JSX.Element
}
