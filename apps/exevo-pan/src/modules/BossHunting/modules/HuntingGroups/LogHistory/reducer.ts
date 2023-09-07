import type { TRPCRouteInputs, TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'

export type QueryState = Required<TRPCRouteInputs['listGuildLog']> & {
  list: TRPCRouteOutputs['listGuildLog']
  initiallyFetched: boolean
  exhausted: boolean
}

export type Action =
  | { type: 'NEXT_PAGE' }
  | { type: 'QUERY_TERM'; term: string }
  | { type: 'UPDATE_LIST'; list: QueryState['list'] }

export const pageSize = 10

export const queryReducer = (state: QueryState, action: Action): QueryState => {
  switch (action.type) {
    case 'NEXT_PAGE':
      return { ...state, pageIndex: state.pageIndex + 1 }

    case 'QUERY_TERM':
      return { ...state, term: action.term, pageIndex: 0 }

    case 'UPDATE_LIST': {
      const resetList = state.pageIndex === 0
      return {
        ...state,
        list: resetList ? action.list : [...state.list, ...action.list],
        initiallyFetched: true,
        exhausted: action.list.length < pageSize,
      }
    }

    default:
      return state
  }
}
