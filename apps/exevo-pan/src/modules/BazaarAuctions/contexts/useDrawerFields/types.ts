export interface DrawerFieldsContextData {
  serverData: Record<string, ServerObject>
  activeServers: Set<string>
  serverOptions: Option[]
  rareItemData: RareItemData
  imbuementOptions: Option[]
  questOptions: Option[]
  achievementOptions: Option[]
  outfitValues: string[]
  storeOutfitValues: string[]
  mountValues: string[]
  storeMountValues: string[]
}

type ServerSideProps = Pick<
  DrawerFieldsContextData,
  'activeServers' | 'serverData' | 'rareItemData'
>

export interface DrawerFieldsProviderProps extends ServerSideProps {
  children: JSX.Element
}
