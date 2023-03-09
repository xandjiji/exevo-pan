import { useTranslations } from 'contexts/useTranslation'
import { Input, Paginator } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { blurOnEnter } from 'utils'
import { useAuctions } from '../../contexts/useAuctions'
import { useForm } from '../../contexts/Form'
import useDebouncedNickname from './useDebouncedNickname'
import AuctionItem from './AuctionItem'

export const PAGE_SIZE = 10

const AuctionSearch = () => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { page, pageData, handlePaginatorFetch } = useAuctions()
  const { dispatch } = useForm()

  const [nickname, setNickname] = useDebouncedNickname()

  return (
    <section className="card p-4">
      <div className="mb-6 flex flex-wrap gap-4 md:flex-nowrap">
        <Input
          id="search-input"
          label={advertise.AuctionSearch.inputLabel}
          placeholder={advertise.AuctionSearch.placeholder}
          aria-label={advertise.AuctionSearch.inputAriaLabel}
          allowClear
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          onKeyPress={blurOnEnter}
          enterKeyHint="search"
          className="flex-grow"
        />
        <Paginator
          aria-controls="auction-list"
          pageSize={PAGE_SIZE}
          totalItems={pageData.totalItems}
          currentPage={pageData.pageIndex + 1}
          onChange={handlePaginatorFetch}
          noItemsMessage={advertise.AuctionSearch.paginatorNoItems}
          className="ml-auto w-fit"
        />
      </div>

      <div
        id="auction-list"
        className="custom-scrollbar grid max-h-[256px] gap-2 overflow-y-auto overflow-x-hidden md:max-h-fit md:overflow-hidden"
      >
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
        {page.length === 0 && (
          <EmptyState
            className="md:mt-4"
            variant="small"
            text={advertise.AuctionSearch.emptyStateText}
          />
        )}
      </div>
    </section>
  )
}

export default AuctionSearch
