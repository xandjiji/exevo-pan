import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { useState, useCallback, useRef, useEffect } from 'react'
import { DEFAULT_PAGINATION_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { ActiveCount, Paginator } from 'components/Atoms'
import { ClientComponent } from 'components/Organisms'
import EmptyState from 'components/EmptyState'
import { FilterIcon } from 'assets/svgs'
import FilterControl from './FilterControl'
import ExpandableCharacterCard from './ExpandableCharacterCard'
import NotFoundAlert from './NotFoundAlert'
import { useSettledMode } from './useSettledMode'
import { useAuctions } from '../../contexts/useAuctions'
import FilterDrawer from '../FilterDrawer'
import SortingDialog from './SortingDialog'
import * as S from './atoms'
import styles from './styles.module.css'

export const PAGE_SIZE = DEFAULT_PAGINATION_OPTIONS.pageSize

const AuctionsGrid = () => {
  const {
    translations: { homepage },
  } = useTranslations()

  const {
    loading,
    mode: unsettledMode,
    favoritedState,
    paginatedData,
    paginationOptions,
    activeFilterCount,
    handlePaginatorFetch,
    highlightedAuctions,
    shouldDisplayHighlightedAuctions,
  } = useAuctions()

  const mode = useSettledMode({ loading, mode: unsettledMode })

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const gridHeadOffset = useRef(0)
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout

    if (gridHeadOffset.current) {
      const newScrollY =
        window.scrollY >= gridHeadOffset.current ? gridHeadOffset.current : 0
      scrollTimer = setTimeout(
        () => window.scrollTo({ top: newScrollY, behavior: 'smooth' }),
        0,
      )
    } else {
      const gridHeader = document.getElementById('grid-header')
      gridHeadOffset.current = gridHeader?.offsetTop ?? -1
    }

    return () => clearTimeout(scrollTimer)
  }, [paginatedData])

  const isFavorites = mode === 'favorites'

  return (
    <main>
      <div
        id="grid-header"
        className="z-71 bg-surface inner-container sticky top-0 flex h-[70px] w-full select-none items-end gap-2 py-2 shadow-md md:items-center"
      >
        <S.Button
          tabIndex={0}
          aria-label={homepage.AuctionsGrid.filterButtonLabel}
          onClick={() => setDrawerOpen(true)}
          className="relative"
          disabled={isFavorites}
        >
          <FilterIcon
            className={clsx(
              'h-[37px] w-[37px] p-0.5',
              isFavorites ? 'fill-separator' : 'fill-onSurface',
            )}
          />
          <ClientComponent className="pointer-events-none absolute -top-0.5 -right-0.5">
            {!isFavorites && (
              <ActiveCount
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
              </ActiveCount>
            )}
          </ClientComponent>
        </S.Button>

        <SortingDialog />

        <ClientComponent className="ml-auto">
          <Paginator
            aria-controls="character-grid"
            pageSize={PAGE_SIZE}
            totalItems={paginatedData.totalItems}
            currentPage={paginationOptions.pageIndex + 1}
            onChange={handlePaginatorFetch}
            noItemsMessage={homepage.AuctionsGrid.noItemsPagination}
          />
        </ClientComponent>
      </div>

      <ClientComponent>
        <FilterDrawer
          id="filter-drawer"
          aria-label={homepage.AuctionsGrid.filterDrawerLabel}
          open={drawerOpen}
          onClose={closeDrawer}
        />
      </ClientComponent>

      <div className="inner-container grid gap-4 py-4">
        <FilterControl />

        {isFavorites && (
          <NotFoundAlert notFoundIds={favoritedState.notFoundIds} />
        )}

        <div
          id="character-grid"
          className="grid w-full grid-cols-[minmax(0,440px)] justify-center gap-4 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] md:after:col-span-full"
        >
          {isFavorites ? (
            <>
              {favoritedState.currentIds.length > 0 && (
                <S.GridTextSeparator>
                  {homepage.AuctionsGrid.separators.current} (
                  {favoritedState.currentIds.length})
                </S.GridTextSeparator>
              )}
              {paginatedData.page
                .filter(({ id }) => favoritedState.currentIds.includes(id))
                .map((characterData) => (
                  <ExpandableCharacterCard
                    key={characterData.id}
                    highlightedAuctions={highlightedAuctions}
                    characterData={characterData}
                  />
                ))}

              {favoritedState.historyIds.length > 0 && (
                <S.GridTextSeparator>
                  {homepage.AuctionsGrid.separators.history} (
                  {favoritedState.historyIds.length})
                </S.GridTextSeparator>
              )}
              {paginatedData.page
                .filter(({ id }) => favoritedState.historyIds.includes(id))
                .map((characterData) => (
                  <ExpandableCharacterCard
                    key={characterData.id}
                    highlightedAuctions={highlightedAuctions}
                    characterData={characterData}
                    past
                  />
                ))}
            </>
          ) : (
            <>
              {shouldDisplayHighlightedAuctions &&
                highlightedAuctions.map((characterData) => (
                  <ExpandableCharacterCard
                    key={`${characterData.id}-highlighted`}
                    characterData={characterData}
                    highlightedAuctions={highlightedAuctions}
                  />
                ))}
              {paginatedData.page.map((characterData) => (
                <ExpandableCharacterCard
                  key={characterData.id}
                  forceNoHighlight={shouldDisplayHighlightedAuctions}
                  highlightedAuctions={highlightedAuctions}
                  characterData={characterData}
                  past={mode === 'history'}
                />
              ))}
            </>
          )}
        </div>
        {paginatedData.page.length === 0 && (
          <EmptyState
            className={styles.empty}
            button={
              isFavorites
                ? undefined
                : {
                    content: homepage.AuctionsGrid.changeFilters,
                    action: () => setDrawerOpen(true),
                  }
            }
            text={{
              content: isFavorites
                ? homepage.AuctionsGrid.noFavorites
                : homepage.AuctionsGrid.noAuctionFound,
              size: 24,
            }}
          />
        )}
      </div>
    </main>
  )
}

export default AuctionsGrid
