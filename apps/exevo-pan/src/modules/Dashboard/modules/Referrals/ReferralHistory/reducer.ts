import type { TRPCRouteInputs, TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'

export type QueryState = Required<
  TRPCRouteInputs['listMyReferralHistoryEntries']
> & {
  list: TRPCRouteOutputs['listMyReferralHistoryEntries']
  exhausted: boolean
}

export type Action =
  | { type: 'NEXT_PAGE' }
  | { type: 'UPDATE_LIST'; list: QueryState['list'] }

export const pageSize = 10

export const queryReducer = (state: QueryState, action: Action): QueryState => {
  switch (action.type) {
    case 'NEXT_PAGE':
      return { ...state, pageIndex: state.pageIndex + 1 }

    case 'UPDATE_LIST': {
      return {
        ...state,
        list: [...state.list, ...action.list],
        exhausted: action.list.length < pageSize,
      }
    }

    default:
      return state
  }
}
