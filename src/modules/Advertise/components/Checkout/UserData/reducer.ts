import { UserDataState, Action } from './types'

const UserDataReducer = (
  state: UserDataState,
  action: Action,
): UserDataState => {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        ...action.values,
      }
    case 'VALIDATE_INPUT':
      return {
        ...state,
        [action.key]: { ...state[action.key], state: action.state },
      }

    default:
      return { ...state }
  }
}

export default UserDataReducer
