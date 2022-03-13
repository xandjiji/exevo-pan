export type Action =
  | {
      type: 'SET_LOADING'
    }
  | {
      type: 'SET_PAGE_INDEX'
      value: number
    }
  | {
      type: 'SET_NICKNAME'
      value: string
    }
  | {
      type: 'STORE_DATA'
      data: PaginatedData<CharacterObject>
    }

export interface AuctionsContextState {
  loading: boolean
  nickname: string
  page: CharacterObject[]
  pageData: PageData
}

export interface AuctionsContextValues extends AuctionsContextState {
  handlePaginatorFetch: (pageIndex: number) => void
  handleNicknameFetch: (newNickname: string) => void
}

export interface AuctionsProviderProps {
  initialPage: CharacterObject[]
  initialPageData: PageData
  children: React.ReactNode
}
