interface LoadingReducerState {
  loadingPaths: string[]
  navigated: string[]
}

type Action =
  | {
      type: 'FINISH_LOADING'
      paths: string[]
    }
  | {
      type: 'START_LOADING'
      paths: string[]
    }

const LoadingReducer = (
  state: LoadingReducerState,
  action: Action,
): LoadingReducerState => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        navigated: [...state.navigated, ...action.paths],
        loadingPaths: [...state.loadingPaths, ...action.paths],
      }

    case 'FINISH_LOADING':
      return {
        ...state,
        loadingPaths: [...state.loadingPaths].filter(
          (path) => !action.paths.includes(path),
        ),
      }

    default:
      return { ...state }
  }
}

export default LoadingReducer
