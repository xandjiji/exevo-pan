import * as S from './styles'
import { CharacterGridProps } from './types'

const CharacterGrid = ({
  itemsPerPage,
  characterList,
  isLoading,
  ...props
}: CharacterGridProps): JSX.Element => {
  return (
    <S.Wrapper {...props}>
      <S.Head>
        <S.FilterIcon />
        <S.SortIcon />

        <S.Paginator
          aria-controls="character-grid"
          pageSize={itemsPerPage}
          totalItems={characterList.length}
          /* @ ToDo: add currentPage state */
          currentPage={1}
          /* @ ToDo: onChange page */
          onChange={newPage => console.log(newPage)}
          noItemsMessage="No characters found"
        />
      </S.Head>
    </S.Wrapper>
  )
}

export default CharacterGrid
