export type Action =
  | {
      type: 'SET_LOADING'
      value: boolean
    }
  | {
      type: 'STORE_DATA'
      data: PaginatedData<CharacterObject>
    }

export interface AuctionsContextState {
  loading: boolean
  page: CharacterObject[]
  pageData: PageData
}

export interface AuctionsContextValues extends AuctionsContextState {
  handlePaginatorFetch: (pageIndex: number) => Promise<void>
  dispatch: React.Dispatch<Action>
}

export interface AuctionsProviderProps {
  initialPage: CharacterObject[]
  initialPageData: PageData
  children: React.ReactNode
}
