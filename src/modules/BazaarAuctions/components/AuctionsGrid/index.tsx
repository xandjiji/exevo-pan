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

const AuctionsGrid = (): JSX.Element => {
  const {
    translations: { homepage },
  } = useTranslations()

  const { page, pageData, handlePaginatorFetch, highlightedAuctions } =
    useAuctions()
  const { activeFilterCount } = useFilters()

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <S.Main>
      <S.Head suppressHydrationWarning>
        <S.FilterButton
          tabIndex={0}
          role="button"
          aria-label={homepage.CharacterGrid.filterButtonLabel}
          onClick={() => setDrawerOpen(true)}
          suppressHydrationWarning
        >
          <S.FilterIcon />
          {process.browser && (
            <S.ActiveIcon
              role="status"
              aria-label={`${activeFilterCount} ${
                activeFilterCount === 1
                  ? homepage.CharacterGrid.filter
                  : homepage.CharacterGrid.filters
              } ${
                activeFilterCount === 1
                  ? homepage.CharacterGrid.is
                  : homepage.CharacterGrid.are
              } ${homepage.CharacterGrid.active}`}
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
            pageSize={10}
            totalItems={pageData.totalItems}
            currentPage={pageData.pageIndex + 1}
            onChange={handlePaginatorFetch}
            noItemsMessage={homepage.CharacterGrid.noItemsPagination}
          />
        )}
      </S.Head>

      {process.browser && (
        <FilterDrawer
          id="filter-drawer"
          aria-label={homepage.CharacterGrid.filterDrawerLabel}
          open={drawerOpen}
          onClose={closeDrawer}
        />
      )}

      <VirtualizedListView
        id="character-grid"
        estimatedHeight={504}
        overScan={1}
      >
        {highlightedAuctions.map((auction) => (
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
