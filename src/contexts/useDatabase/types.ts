export type Action = {
  type: 'WAR_GUILD_DATA_LOAD'
  warGuildData: MemberWarData[]
}

export interface DatabaseContextValues {
  loading: boolean
  warGuildData: MemberWarData[]
  dispatch: (action: Action) => void
}

export interface WarGuildDataContextValues {
  warGuildData: MemberWarData[]
  loading: boolean
}

export interface DatabaseDispatchContextValues {
  dispatch: (action: Action) => void
}

export interface DatabaseReducerState {
  warGuildData: MemberWarData[]
}
