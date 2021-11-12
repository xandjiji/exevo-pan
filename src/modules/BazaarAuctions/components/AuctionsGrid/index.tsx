import { useTranslations } from 'contexts/useTranslation'
import { useState, useCallback, useRef } from 'react'
import CharacterCard from 'components/CharacterCard'
import { useAuctions } from '../../contexts/useAuctions'
import FilterDrawer from '../FilterDrawer'
import SortingDialog from './SortingDialog'
import VirtualizedListView from './VirtualizedListView'
import EmptyState from './EmptyState'
import * as S from './styles'

const CharacterGrid = (): JSX.Element => {
  const {
    translations: { homepage },
  } = useTranslations()

  const { page, pageData, handlePaginatorFetch } = useAuctions()

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [activeFilterCount, setActiveFilterCount] = useState<number>(0)

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const gridRef = useRef<HTMLDivElement | null>(null)

  return (
    <S.Main>
      <S.Head>
        <S.FilterButton
          tabIndex={0}
          role="button"
          aria-label={homepage.CharacterGrid.filterButtonLabel}
          onClick={() => setDrawerOpen(true)}
        >
          <S.FilterIcon />
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
            aria-hidden={activeFilterCount < 1}
          >
            {activeFilterCount}
          </S.ActiveIcon>
        </S.FilterButton>

        <SortingDialog />

        <S.Paginator
          aria-controls="character-grid"
          pageSize={10}
          totalItems={pageData.totalItems}
          currentPage={pageData.pageIndex + 1}
          onChange={handlePaginatorFetch}
          noItemsMessage={homepage.CharacterGrid.noItemsPagination}
        />
      </S.Head>

      {process.browser && (
        <FilterDrawer
          id="filter-drawer"
          aria-label={homepage.CharacterGrid.filterDrawerLabel}
          open={drawerOpen}
          onClose={closeDrawer}
          setActiveFilterCount={setActiveFilterCount}
        />
      )}

      <VirtualizedListView
        ref={gridRef}
        id="character-grid"
        estimatedHeight={504}
        overScan={1}
      >
        {page.map((auction) => (
          <CharacterCard key={auction.id} characterData={auction} />
        ))}
      </VirtualizedListView>
    </S.Main>
  )
}

export default CharacterGrid
