import clsx from 'clsx'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_PAGINATION_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { ActiveCount, Paginator } from 'components/Atoms'
import { ClientComponent } from 'components/Organisms'
import EmptyState from 'components/EmptyState'
import { FilterIcon } from 'assets/svgs'
import { links } from 'Constants'
import { AuctionNotificationsProvider } from './useAuctionNotifications'
import FilterControl from './FilterControl'
import ExpandableCharacterCard from './ExpandableCharacterCard'
import NotFoundAlert from './NotFoundAlert'
import { useSettledMode } from './useSettledMode'
import { useAuctions } from '../../contexts/useAuctions'
import FilterDrawer from '../FilterDrawer'
import SortingDialog from './SortingDialog'
import { TibiaTradeBanner } from './TibiaTradeBanner'
import * as S from './atoms'

export const PAGE_SIZE = DEFAULT_PAGINATION_OPTIONS.pageSize

type AuctionsGridProps = { tibiaTradeItems?: TibiaTradeHighlightedItem[] }

const AuctionsGrid = ({ tibiaTradeItems = [] }: AuctionsGridProps) => {
  const { homepage } = useTranslations()

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

  const initiallyLoaded = useRef(false)
  useEffect(() => {
    if (!initiallyLoaded.current) {
      initiallyLoaded.current = true
      return () => {}
    }

    if (window.scrollY === 0) return () => {}

    const scrollTimer = setTimeout(() => {
      const filterControl = document.getElementById('filter-control')
      const gridHeader = document.getElementById('grid-header')
      if (!filterControl || !gridHeader) return

      const filterControlPosition =
        filterControl.getBoundingClientRect().top + window.pageYOffset
      const headerHeight = gridHeader.getBoundingClientRect().height

      const offset = headerHeight + 16

      window.scrollTo({
        top: filterControlPosition - offset,
        behavior: 'smooth',
      })
    }, 0)

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
            pageSize={isFavorites ? paginatedData.totalItems : PAGE_SIZE}
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

      <section className="inner-container relative mt-4 overflow-hidden sm:hidden">
        <div className="z-1 from-background absolute top-0 right-0 h-full w-8 bg-gradient-to-l to-transparent" />

        <p className="text-tsm mb-2 font-light">
          {templateMessage(homepage.AuctionsGrid.BestiaryBanner.heading, {
            link: (
              <a
                href={`${links.BESTIARY_ARENA}/?t=exevoscrolla`}
                target="_blank"
                rel="noopener external nofollow noreferrer"
                className="text-primaryHighlight font-bold tracking-wide"
              >
                Bestiary Arena
              </a>
            ),
          })}
        </p>

        <a
          href={`${links.BESTIARY_ARENA}/?t=exevoscrollb`}
          target="_blank"
          rel="noopener external nofollow noreferrer"
          className="h-[60px] md:hidden"
        >
          <img
            alt="Open Summon Scroll"
            className="pixelated mx-auto h-[60px] w-[468px] shadow-lg"
            src="https://i.imgur.com/tZ7ba1h.png"
          />
        </a>
      </section>

      <div className="inner-container grid gap-4 py-4">
        <div className="grid gap-2 md:gap-10">
          {tibiaTradeItems.length > 0 && (
            <TibiaTradeBanner items={tibiaTradeItems} />
          )}
        </div>

        <FilterControl />

        {isFavorites && (
          <NotFoundAlert notFoundIds={favoritedState.notFoundIds} />
        )}

        <AuctionNotificationsProvider>
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
        </AuctionNotificationsProvider>
        {paginatedData.page.length === 0 && (
          <EmptyState
            className="md:mt-[calc(30vh-200px)]"
            variant="large"
            button={
              isFavorites
                ? undefined
                : {
                    content: homepage.AuctionsGrid.changeFilters,
                    action: () => setDrawerOpen(true),
                  }
            }
            text={
              isFavorites
                ? homepage.AuctionsGrid.noFavorites
                : homepage.AuctionsGrid.noAuctionFound
            }
          />
        )}
      </div>
    </main>
  )
}

export default AuctionsGrid
