import { DatabaseReducerState, Action } from './types'

const DatabaseReducer = (
  state: DatabaseReducerState,
  action: Action,
): DatabaseReducerState => {
  switch (action.type) {
    case 'WAR_GUILD_DATA_LOAD':
      return { ...state, warGuildData: action.warGuildData }

    default:
      return { ...state }
  }
}

export default DatabaseReducer
