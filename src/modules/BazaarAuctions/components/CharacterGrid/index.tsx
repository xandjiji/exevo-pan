import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { useIsMounted } from 'hooks'
import { urlParametersState } from 'utils'
import FilterDrawer from '../FilterDrawer'
import CharacterCard, { CardSkeleton } from '../CharacterCard'
import SortingDialog from './SortingDialog'
import EmptyState from './EmptyState'
import { applySort } from './applySort'
import * as S from './styles'
import { CharacterGridProps } from './types'

const CharacterGrid = ({
  itemsPerPage = 10,
  characterList,
  defaultSortMode = 0,
  defaultDescendingOrder = false,
  isLoading,
  ...props
}: CharacterGridProps): JSX.Element => {
  const isDesktop = useRef(false)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    isDesktop.current = window.matchMedia('(min-width: 768px)').matches
    setCurrentPage(getUrlValues().currentPage as number)
    setSortMode(getUrlValues().orderBy as number)
    setDescendingOrder(getUrlValues().descending as boolean)
  }, [])

  return (
    <S.Main {...props}>
      <S.Head>
        <S.FilterButton
          tabIndex={0}
          role="button"
          aria-label="Open filter drawer"
          aria-controls="filter-drawer"
          onClick={() => setDrawerOpen(true)}
        >
          <S.FilterIcon />
          <S.ActiveIcon
            role="status"
            aria-label={`${activeFilterCount} ${
              activeFilterCount === 1 ? 'filter' : 'filters'
            } ${activeFilterCount === 1 ? 'is' : 'are'} active`}
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
          noItemsMessage="No characters found"
        />
      </S.Head>

      {isMounted && (
        <FilterDrawer
          id="filter-drawer"
          aria-label="Filter form"
          open={drawerOpen}
          onClose={closeDrawer}
          setActiveFilterCount={setActiveFilterCount}
        />
      )}

      <S.Grid ref={gridRef} id="character-grid">
        {gridState.current !== 'ready' ? (
          Array.from({ length: isDesktop.current ? 10 : 2 }, (_, index) => (
            <CardSkeleton key={index} />
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
