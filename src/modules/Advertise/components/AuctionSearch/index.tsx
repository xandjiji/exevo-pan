import { useState, useCallback, useMemo } from 'react'
import { useCharacters } from 'contexts/useDatabase'
import * as S from './styles'

const PAGE_SIZE = 10

const AuctionSearch = (): JSX.Element => {
  const { characterData } = useCharacters()

  const [nickname, setNickname] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(event.target.value)
      setCurrentPage(1)
    },
    [],
  )

  const onPageChange = useCallback(
    (newPage: number) => setCurrentPage(newPage),
    [],
  )

  const auctionList = useMemo(() => {
    const lowerCaseTerm = nickname.toLowerCase()
    return characterData.filter((character) =>
      character.nickname.toLowerCase().includes(lowerCaseTerm),
    )
  }, [nickname])

  return (
    <S.Wrapper>
      <S.SearchHeader>
        <S.InputWrapper>
          <S.Label htmlFor="search-input">Search by nickname</S.Label>
          <S.Input
            id="search-input"
            placeholder="Nickname"
            aria-label="Search an auction by its character nickname"
            allowClear
            value={nickname}
            onChange={onInputChange}
          />
        </S.InputWrapper>
        <S.Paginator
          /* @ ToDo: add aria-controls */
          aria-controls="members-grid"
          pageSize={PAGE_SIZE}
          totalItems={auctionList.length}
          currentPage={currentPage}
          onChange={onPageChange}
          noItemsMessage="No auctions"
        />
      </S.SearchHeader>
    </S.Wrapper>
  )
}

export default AuctionSearch
