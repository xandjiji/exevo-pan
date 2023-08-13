import type { TRPCRouteInputs, TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'

export type QueryState = Required<TRPCRouteInputs['listGuildChecks']> & {
  lastTerm: string
  list: TRPCRouteOutputs['listGuildChecks']
}

export type Action =
  | { type: 'NEXT_PAGE' }
  | { type: 'QUERY_TERM'; term: string }
  | { type: 'UPDATE_LIST'; list: QueryState['list'] }

export const QueryReducer = (state: QueryState, action: Action): QueryState => {
  switch (action.type) {
    case 'NEXT_PAGE':
      return { ...state, pageIndex: state.pageIndex + 1 }

    case 'QUERY_TERM':
      return { ...state, term: action.term, pageIndex: 0 }

    case 'UPDATE_LIST': {
      const sameTerm = state.lastTerm === state.term
      return {
        ...state,
        list: sameTerm ? [...state.list, ...action.list] : action.list,
        lastTerm: state.term,
      }
    }

    default:
      return state
  }
}
