export type Dataset = {
  rawServerData: Record<string, ServerObject>
  serverData: ServerObject[]
  minifiedCharacterData: MinifiedCharacterObject[]
  characterData: CharacterObject[]
  rawItemData: RareItemData
  itemData: RareItemData
}
