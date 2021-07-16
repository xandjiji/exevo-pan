interface LoadingReducerState {
  loadingPaths: string[]
  navigated: string[]
}

type Action =
  | {
      type: 'FINISH_LOADING'
      path: string
    }
  | {
      type: 'START_LOADING'
      path: string
    }

export default (
  state: LoadingReducerState,
  action: Action,
): LoadingReducerState => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        navigated: [...state.navigated, action.path],
        loadingPaths: [...state.loadingPaths, action.path],
      }

    case 'FINISH_LOADING': {
      return {
        ...state,
        loadingPaths: [...state.loadingPaths].filter(
          path => action.path !== path,
        ),
      }
    }

    default:
      return { ...state }
  }
}
