import { endpoints } from 'Constants'
import { AuctionsProvider } from './contexts/useAuctions'
import { FiltersProvider } from './contexts/useFilters'
import AuctionsGrid from './components/AuctionsGrid'
import LoadingState from './components/LoadingState'
import { CurrentAuctionsProps, BazaarHistoryProps } from './types'

export const CurrentAuctions = ({
  initialAuctionData,
  highlightedAuctions,
}: CurrentAuctionsProps): JSX.Element => {
  const { page, sortingMode, descendingOrder, ...pageData } = initialAuctionData

  return (
    <FiltersProvider>
      <AuctionsProvider
        endpoint={endpoints.CURRENT_AUCTIONS}
        highlightedAuctions={highlightedAuctions}
        initialPage={page}
        initialPageData={pageData}
        defaultSortingMode={sortingMode}
        defaultDescendingOrder={descendingOrder}
      >
        <AuctionsGrid />
      </AuctionsProvider>
    </FiltersProvider>
  )
}

export const BazaarHistory = ({
  initialAuctionData,
}: BazaarHistoryProps): JSX.Element => {
  const { page, sortingMode, descendingOrder, ...pageData } = initialAuctionData

  return (
    <FiltersProvider>
      <AuctionsProvider
        endpoint={endpoints.HISTORY_AUCTIONS}
        highlightedAuctions={[]}
        initialPage={page}
        initialPageData={pageData}
        defaultSortingMode={sortingMode}
        defaultDescendingOrder={descendingOrder}
      >
        <LoadingState>
          <AuctionsGrid />
        </LoadingState>
      </AuctionsProvider>
    </FiltersProvider>
  )
}
