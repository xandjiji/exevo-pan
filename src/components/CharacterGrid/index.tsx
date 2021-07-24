import { useState, useMemo, useRef, useEffect, useContext } from 'react'
import SideDrawerContext from 'contexts/SideDrawer/context'
import CharacterCard, { CardSkeleton } from '../CharacterCard'
import SortingDialog from './SortingDialog'
import { applySort } from './applySort'
import * as S from './styles'
import { CharacterGridProps } from './types'

const CharacterGrid = ({
  itemsPerPage = 10,
  characterList,
  isLoading,
  ...props
}: CharacterGridProps): JSX.Element => {
  /* @ ToDo: remove this after SideDrawer refactor*/
  const { toggleSideDrawer } = useContext(SideDrawerContext)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortMode, setSortMode] = useState<number>(0)
  const [descendingOrder, setDescendingOrder] = useState<boolean>(false)

  const gridRef = useRef<HTMLDivElement | null>(null)

  const sortedData = useMemo(
    () => applySort(characterList, sortMode, descendingOrder),
    [characterList, sortMode, descendingOrder],
  )

  const characterPage = useMemo(
    () =>
      sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      ),
    [itemsPerPage, sortedData, currentPage],
  )

  useEffect(() => {
    gridRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [characterPage])

  return (
    <S.Wrapper ref={gridRef} {...props}>
      <S.Head>
        <S.FilterIcon onClick={toggleSideDrawer} />
        <SortingDialog
          sortModeControl={[sortMode, setSortMode]}
          descendingOrderControl={[descendingOrder, setDescendingOrder]}
        />

        <S.Paginator
          aria-controls="character-grid"
          pageSize={itemsPerPage}
          totalItems={sortedData.length}
          currentPage={currentPage}
          onChange={newPage => setCurrentPage(newPage)}
          noItemsMessage="No characters found"
        />
      </S.Head>

      <S.Grid id="character-grid">
        {isLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <CardSkeleton key={index} />
            ))
          : characterPage.map(item => (
              <CharacterCard key={item.id} characterData={item} />
            ))}
      </S.Grid>
    </S.Wrapper>
  )
}

export default CharacterGrid
