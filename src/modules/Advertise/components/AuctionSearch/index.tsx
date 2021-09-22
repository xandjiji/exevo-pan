import { useState, useCallback, useMemo, useRef } from 'react'
import { useCharacters } from 'contexts/useDatabase'
import { useForm } from '../../contexts/Form'
import AuctionItem, { SkeletonItem } from './AuctionItem'
import EmptyState from './EmptyState'
import * as S from './styles'

const PAGE_SIZE = 10

const AuctionSearch = (): JSX.Element => {
  const { baseCharacterData, loading } = useCharacters()
  const { dispatch } = useForm()

  const [nickname, setNickname] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const loadState = useRef<'loading' | 'ready'>('loading')
  const listRef = useRef<HTMLDivElement>(null)

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
    if (loadState.current === 'loading' && baseCharacterData.length) {
      loadState.current = 'ready'
    }
    const lowerCaseTerm = nickname.toLowerCase()
    return baseCharacterData.filter((character) =>
      character.nickname.toLowerCase().includes(lowerCaseTerm),
    )
  }, [baseCharacterData, nickname])

  const currentListPage = useMemo(() => {
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    return auctionList.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    )
  }, [auctionList, currentPage])

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
          aria-controls="auction-list"
          pageSize={PAGE_SIZE}
          totalItems={auctionList.length}
          currentPage={currentPage}
          onChange={onPageChange}
          noItemsMessage="No auctions"
        />
      </S.SearchHeader>

      <S.AuctionList id="auction-list" ref={listRef}>
        {loadState.current === 'loading' &&
          Array.from({ length: PAGE_SIZE }, (_, index) => (
            <SkeletonItem key={index} />
          ))}
        {currentListPage.map((character) => (
          <AuctionItem
            key={character.id}
            nickname={character.nickname}
            level={character.level}
            vocationId={character.vocationId}
            outfitId={character.outfitId}
            onClick={() => dispatch({ type: 'SELECT_CHARACTER', character })}
          />
        ))}
        {!loading && nickname && !currentListPage.length && <EmptyState />}
      </S.AuctionList>
    </S.Wrapper>
  )
}

export default AuctionSearch
