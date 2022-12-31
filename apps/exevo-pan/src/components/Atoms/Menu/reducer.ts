export type MenuState = {
  highlightedIndex: number
  open: boolean
}

export type Action =
  | {
      type: 'RESET_HIGHLIGHT'
    }
  | {
      type: 'SET_HIGHLIGHTED_INDEX'
      index: number
    }
  | {
      type: 'SET_OPEN'
      open: boolean
    }

const Reducer = (state: MenuState, action: Action): MenuState => {
  switch (action.type) {
    case 'RESET_HIGHLIGHT':
      return { ...state, highlightedIndex: -1 }

    case 'SET_HIGHLIGHTED_INDEX':
      return { ...state, highlightedIndex: action.index, open: true }

    case 'SET_OPEN':
      return { ...state, open: action.open, highlightedIndex: -1 }

    default:
      return state
  }
}

export default Reducer
