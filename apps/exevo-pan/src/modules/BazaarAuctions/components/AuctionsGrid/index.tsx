import { useTranslations } from 'contexts/useTranslation'
import { useState, useCallback, useRef, useEffect } from 'react'
import { DEFAULT_PAGINATION_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { ActiveCount, Paginator } from 'components/Atoms'
import { ClientComponent } from 'components/Organisms'
import EmptyState from 'components/EmptyState'
import { FilterIcon } from 'assets/svgs'
import FilterControl from './FilterControl'
import ExpandableCharacterCard from './ExpandableCharacterCard'
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
    isHistory,
    paginatedData,
    paginationOptions,
    activeFilterCount,
    handlePaginatorFetch,
    highlightedAuctions,
    shouldDisplayHighlightedAuctions,
  } = useAuctions()

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
        >
          <FilterIcon className={styles.icon} />
          <ClientComponent className="pointer-events-none absolute -top-0.5 -right-0.5">
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

        <div
          id="character-grid"
          className="grid w-full grid-cols-[minmax(0,440px)] justify-center gap-4 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] md:after:col-span-full"
        >
          {shouldDisplayHighlightedAuctions &&
            highlightedAuctions.map((auction) => (
              <ExpandableCharacterCard
                key={`${auction.id}-highlighted`}
                characterData={auction}
                highlighted
                lazyRender
                past={isHistory}
              />
            ))}
          {paginatedData.page.map((auction) => {
            const highlightedAuction = highlightedAuctions.find(
              ({ id }) => id === auction.id,
            )
            const characterData: CharacterObject = highlightedAuction
              ? { ...auction, tcInvested: highlightedAuction.tcInvested }
              : auction

            return (
              <ExpandableCharacterCard
                key={auction.id}
                highlighted={
                  !!highlightedAuction && !shouldDisplayHighlightedAuctions
                }
                lazyRender
                characterData={characterData}
                past={isHistory}
              />
            )
          })}
        </div>
        {paginatedData.page.length === 0 && (
          <EmptyState
            className={styles.empty}
            button={{
              content: homepage.AuctionsGrid.changeFilters,
              action: () => setDrawerOpen(true),
            }}
            text={{
              content: homepage.AuctionsGrid.noAuctionFound,
              size: 24,
            }}
          />
        )}
      </div>
    </main>
  )
}

export default AuctionsGrid
