import { useCharacters } from 'contexts/useDatabase'
import { AuctionsProvider } from './contexts/useAuctions'
import AuctionsGrid from './components/AuctionsGrid'
import CharacterGrid from './components/CharacterGrid'
import { CurrentAuctionsProps } from './types'

export const CurrentAuctions = ({
  initialAuctionData,
}: CurrentAuctionsProps): JSX.Element => {
  const { page, ...pageData } = initialAuctionData

  return (
    <AuctionsProvider
      initialPage={page}
      initialPageData={pageData}
      initialSortingMode={0}
      initialDescendingOrder={false}
    >
      <AuctionsGrid />
    </AuctionsProvider>
  )
}

export const BazaarHistory = (): JSX.Element => {
  const { historyData, loading } = useCharacters()

  return (
    <CharacterGrid
      characterList={historyData}
      defaultDescendingOrder
      isLoading={loading}
    />
  )
}
