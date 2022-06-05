import { getChildrenOptions } from './utils'
import { SelectState, Action } from './types'

const SelectReducer = (state: SelectState, action: Action): SelectState => {
  switch (action.type) {
    case 'SET_LISTBOX_STATUS':
      if (action.value === state.listboxStatus) return state
      return { ...state, listboxStatus: action.value ?? !state.listboxStatus }

    case 'REDEFINE_OPTIONS':
      return {
        ...state,
        options: getChildrenOptions(action.children),
      }

    default:
      return state
  }
}

export default SelectReducer
