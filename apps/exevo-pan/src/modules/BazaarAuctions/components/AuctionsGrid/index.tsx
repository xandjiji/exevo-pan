import { useTranslations } from 'contexts/useTranslation'
import { Fragment, useState, useCallback, useRef, useEffect } from 'react'
import { Ads } from 'templates'
import { DEFAULT_PAGINATION_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { useAuctions } from '../../contexts/useAuctions'
import { useFilters } from '../../contexts/useFilters'
import FilterDrawer from '../FilterDrawer'
import SortingDialog from './SortingDialog'
import CharacterModal from './CharacterModal'
import { shouldInsertAd } from './utils'
import * as S from './styles'

export const PAGE_SIZE = DEFAULT_PAGINATION_OPTIONS.pageSize
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

  const [selectedCharacter, selectCharacter] = useState<
    CharacterObject | undefined
  >()

  const currentVisibleHighlighteds = shouldDisplayHighlightedAuctions
    ? highlightedAuctions.length
    : 0

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
  }, [page])

  return (
    <main>
      <S.Head suppressHydrationWarning id="grid-header">
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

      <S.GridWrapper>
        <S.Grid id="character-grid">
          {shouldDisplayHighlightedAuctions &&
            highlightedAuctions.map((auction, index) => (
              <Fragment key={`${auction.id}-highlighted`}>
                <S.CharacterCard
                  characterData={auction}
                  highlighted
                  lazyRender
                  onClick={() => selectCharacter(auction)}
                />

                {shouldInsertAd(index) && (
                  <Ads.CharacterCard height={ESTIMATED_HEIGHT} />
                )}
              </Fragment>
            ))}
          {page.map((auction, index) => (
            <Fragment key={auction.id}>
              <S.CharacterCard
                lazyRender
                characterData={auction}
                onClick={() => selectCharacter(auction)}
              />

              {shouldInsertAd(index + currentVisibleHighlighteds) && (
                <Ads.CharacterCard height={ESTIMATED_HEIGHT} />
              )}
            </Fragment>
          ))}
        </S.Grid>
        {page.length === 0 && (
          <S.EmptyState
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
      </S.GridWrapper>
      <CharacterModal
        open={!!selectedCharacter}
        characterData={selectedCharacter}
        onClose={() => selectCharacter(undefined)}
      />

      <Ads.FooterBanner key={pageData.pageIndex} />
    </main>
  )
}

export default AuctionsGrid
