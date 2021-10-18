export type Action =
  | {
      type: 'APPLY_FILTERS'
      filters: FilterState
      isHistory: boolean
    }
  | {
      type: 'INITIAL_DATA_LOAD'
      characterData: CharacterObject[]
      highlightedAuctions: HighlightedAuction[]
      serverData: ServerObject[]
      rareItemData: RareItemData
      isHistory: boolean
    }
  | {
      type: 'RESET_TO_BASE_DATA'
    }
  | {
      type: 'WAR_GUILD_DATA_LOAD'
      warGuildData: MemberWarData[]
    }

export interface DatabaseContextValues {
  loading: boolean
  characterData: CharacterObject[]
  serverData: ServerObject[]
  rareItemData: RareItemData
  historyData: CharacterObject[]
  highlightedAuctions: CharacterObject[]
  warGuildData: MemberWarData[]
  dispatch: (action: Action) => void
}

export interface CharactersContextValues {
  loading: boolean
  characterData: CharacterObject[]
  historyData: CharacterObject[]
  baseCharacterData: CharacterObject[]
  baseHistoryData: CharacterObject[]
  highlightedAuctions: CharacterObject[]
}

export interface DrawerFieldsContextValues {
  loading: boolean
  serverData: ServerObject[]
  rareItemData: RareItemData
}

export interface WarGuildDataContextValues {
  warGuildData: MemberWarData[]
  loading: boolean
}

export interface DatabaseDispatchContextValues {
  dispatch: (action: Action) => void
}

export interface DatabaseReducerState {
  baseCharacterData: CharacterObject[]
  characterData: CharacterObject[]
  serverData: ServerObject[]
  rareItemData: RareItemData
  baseHistoryData: CharacterObject[]
  historyData: CharacterObject[]
  highlightedAuctions: CharacterObject[]
  warGuildData: MemberWarData[]
}
