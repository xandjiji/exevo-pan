import { useTranslations } from 'contexts/useTranslation'
import { useState, useCallback } from 'react'
import CharacterCard from 'components/CharacterCard'
import { useAuctions } from '../../contexts/useAuctions'
import { useFilters } from '../../contexts/useFilters'
import FilterDrawer from '../FilterDrawer'
import SortingDialog from './SortingDialog'
import VirtualizedListView from './VirtualizedListView'
import EmptyState from './EmptyState'
import * as S from './styles'

export const PAGE_SIZE = 10
const ESTIMATED_HEIGHT = 479

const AuctionsGrid = (): JSX.Element => {
  const {
    translations: { homepage },
  } = useTranslations()

  const {
    page,
    pageData,
    handlePaginatorFetch,
    highlightedAuctions,
    shouldDisplayHighlightedAuctions,
  } = useAuctions()
  const { activeFilterCount } = useFilters()

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <S.Main>
      <S.Head suppressHydrationWarning>
        <S.FilterButton
          tabIndex={0}
          role="button"
          aria-label={homepage.AuctionsGrid.filterButtonLabel}
          onClick={() => setDrawerOpen(true)}
          suppressHydrationWarning
        >
          <S.FilterIcon />
          {process.browser && (
            <S.ActiveIcon
              role="status"
              aria-label={`${activeFilterCount} ${
                activeFilterCount === 1
                  ? homepage.AuctionsGrid.filter
                  : homepage.AuctionsGrid.filters
              } ${
                activeFilterCount === 1
                  ? homepage.AuctionsGrid.is
                  : homepage.AuctionsGrid.are
              } ${homepage.AuctionsGrid.active}`}
              aria-hidden={activeFilterCount === 0}
            >
              {activeFilterCount}
            </S.ActiveIcon>
          )}
        </S.FilterButton>

        <SortingDialog />

        {process.browser && (
          <S.Paginator
            aria-controls="character-grid"
            pageSize={PAGE_SIZE}
            totalItems={pageData.totalItems}
            currentPage={pageData.pageIndex + 1}
            onChange={handlePaginatorFetch}
            noItemsMessage={homepage.AuctionsGrid.noItemsPagination}
          />
        )}
      </S.Head>

      {process.browser && (
        <FilterDrawer
          id="filter-drawer"
          aria-label={homepage.AuctionsGrid.filterDrawerLabel}
          open={drawerOpen}
          onClose={closeDrawer}
        />
      )}

      <VirtualizedListView
        id="character-grid"
        estimatedHeight={ESTIMATED_HEIGHT}
        overScan={1}
      >
        {shouldDisplayHighlightedAuctions &&
          highlightedAuctions.map((auction) => (
            <CharacterCard
              key={`${auction.id}-highlighted`}
              characterData={auction}
              highlighted
            />
          ))}
        {page.map((auction) => (
          <CharacterCard key={auction.id} characterData={auction} />
        ))}
      </VirtualizedListView>
      {page.length === 0 && (
        <EmptyState buttonAction={() => setDrawerOpen(true)} />
      )}
    </S.Main>
  )
}

export default AuctionsGrid
