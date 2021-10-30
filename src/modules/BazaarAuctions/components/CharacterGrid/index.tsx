import { useTranslations } from 'contexts/useTranslation'
import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import CharacterCard from 'components/CharacterCard'
import { useIsMounted } from 'hooks'
import { urlParametersState } from 'utils'
import FilterDrawer from '../FilterDrawer'
import SortingDialog from './SortingDialog'
import EmptyState from './EmptyState'
import { applySort } from './applySort'
import * as S from './styles'
import { CharacterGridProps } from './types'

const CharacterGrid = ({
  itemsPerPage = 10,
  characterList,
  highlightedList,
  defaultSortMode = 0,
  defaultDescendingOrder = false,
  ...props
}: CharacterGridProps): JSX.Element => {
  const {
    translations: { homepage },
  } = useTranslations()

  const isMounted = useIsMounted()

  const { getUrlValues, defaultValues, setUrlValues } = useMemo(
    () =>
      urlParametersState([
        {
          key: 'currentPage',
          defaultValue: 1,
        },
        {
          key: 'descending',
          defaultValue: defaultDescendingOrder,
          decode: (value: string) => decodeURIComponent(value) === 'true',
        },
        {
          key: 'orderBy',
          defaultValue: defaultSortMode,
          decode: (value: string) => Number(decodeURIComponent(value)),
        },
      ]),
    [defaultDescendingOrder, defaultSortMode],
  )

  const gridState = useRef<'initial' | 'processing' | 'ready'>('initial')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortMode, setSortMode] = useState<number>(defaultSortMode)
  const [descendingOrder, setDescendingOrder] = useState<boolean>(
    defaultDescendingOrder,
  )
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [activeFilterCount, setActiveFilterCount] = useState<number>(0)

  const gridRef = useRef<HTMLDivElement | null>(null)

  const sortedData = useMemo(() => {
    if (gridState.current === 'initial' && characterList.length) {
      gridState.current = 'processing'
    }
    return applySort(characterList, sortMode, descendingOrder)
  }, [characterList, sortMode, descendingOrder])

  const characterPage = useMemo(
    () =>
      sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      ),
    [itemsPerPage, sortedData, currentPage],
  )

  useEffect(() => {
    if (gridState.current === 'ready') {
      setCurrentPage(1)
    } else if (gridState.current === 'processing') {
      gridState.current = 'ready'
    }
  }, [sortedData.length])

  useEffect(() => {
    if (gridState.current === 'ready') {
      setSortMode(defaultValues.orderBy as number)
      setDescendingOrder(defaultValues.descending as boolean)
    }
  }, [defaultValues.orderBy, defaultValues.descending])

  useEffect(() => {
    if (gridState.current === 'ready') {
      setUrlValues({
        currentPage,
        descending: descendingOrder,
        orderBy: sortMode,
      })
    }
  }, [currentPage, sortMode, descendingOrder])

  useEffect(() => {
    if (gridState.current === 'ready')
      gridRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [characterPage])

  const onPageChange = useCallback(
    (newPage: number) => setCurrentPage(newPage),
    [],
  )

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  useEffect(() => {
    setCurrentPage(getUrlValues().currentPage as number)
    setSortMode(getUrlValues().orderBy as number)
    setDescendingOrder(getUrlValues().descending as boolean)
  }, [])

  const shouldDisplayHighlighted: boolean =
    currentPage === 1 && sortMode === defaultSortMode && activeFilterCount === 0

  return (
    <S.Main {...props}>
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

        <SortingDialog
          sortMode={sortMode}
          setSortMode={setSortMode}
          descendingOrder={descendingOrder}
          setDescendingOrder={setDescendingOrder}
        />

        <S.Paginator
          aria-controls="character-grid"
          pageSize={itemsPerPage}
          totalItems={sortedData.length}
          currentPage={currentPage}
          onChange={onPageChange}
          noItemsMessage={homepage.CharacterGrid.noItemsPagination}
        />
      </S.Head>

      {isMounted && (
        <FilterDrawer
          id="filter-drawer"
          aria-label={homepage.CharacterGrid.filterDrawerLabel}
          open={drawerOpen}
          onClose={closeDrawer}
          setActiveFilterCount={setActiveFilterCount}
        />
      )}

      <S.Grid ref={gridRef} id="character-grid">
        {gridState.current === 'ready' &&
          shouldDisplayHighlighted &&
          highlightedList?.map((item) => (
            <CharacterCard
              key={`${item.id}-highlighted`}
              highlighted
              characterData={item}
            />
          ))}

        {gridState.current !== 'ready' ? (
          Array.from({ length: 10 }, (_, index) => (
            <S.CardSkeleton key={index} />
          ))
        ) : characterPage.length ? (
          characterPage.map((item) => (
            <CharacterCard key={item.id} characterData={item} />
          ))
        ) : (
          <EmptyState buttonAction={() => setDrawerOpen(true)} />
        )}
      </S.Grid>
    </S.Main>
  )
}

export default CharacterGrid
