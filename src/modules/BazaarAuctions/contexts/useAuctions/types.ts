export interface AuctionsContextValues {
  loading: boolean
  page: CharacterObject[]
  pageData: PageData
}

export interface AuctionsProviderProps {
  initialPage: CharacterObject[]
  initialPageData: PageData
  children: React.ReactNode
}
