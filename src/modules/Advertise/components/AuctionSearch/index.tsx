import { useTranslations } from 'contexts/useTranslation'
import { useAuctions } from '../../contexts/useAuctions'
import { useForm } from '../../contexts/Form'
import useDebouncedNickname from './useDebouncedNickname'
import AuctionItem from './AuctionItem'
import EmptyState from './EmptyState'
import * as S from './styles'

export const PAGE_SIZE = 10

const AuctionSearch = (): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { page, pageData, handlePaginatorFetch } = useAuctions()
  const { dispatch } = useForm()

  const [nickname, setNickname] = useDebouncedNickname()

  return (
    <S.Wrapper>
      <S.SearchHeader>
        <S.InputWrapper>
          <S.Label htmlFor="search-input">
            {advertise.AuctionSearch.inputLabel}
          </S.Label>
          <S.Input
            id="search-input"
            placeholder={advertise.AuctionSearch.placeholder}
            aria-label={advertise.AuctionSearch.inputAriaLabel}
            allowClear
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
        </S.InputWrapper>
        <S.Paginator
          aria-controls="auction-list"
          pageSize={PAGE_SIZE}
          totalItems={pageData.totalItems}
          currentPage={pageData.pageIndex + 1}
          onChange={handlePaginatorFetch}
          noItemsMessage={advertise.AuctionSearch.paginatorNoItems}
        />
      </S.SearchHeader>

      <S.AuctionList id="auction-list">
        {page.map((character) => (
          <AuctionItem
            key={character.id}
            nickname={character.nickname}
            level={character.level}
            vocationId={character.vocationId}
            outfitId={character.outfitId}
            onClick={() => dispatch({ type: 'SELECT_CHARACTER', character })}
          />
        ))}
        {page.length === 0 && <EmptyState />}
      </S.AuctionList>
    </S.Wrapper>
  )
}

export default AuctionSearch
