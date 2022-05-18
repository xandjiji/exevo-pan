import { useTranslations } from 'contexts/useTranslation'
import { Input, Paginator } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
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
        <div className="flex-grow">
          <label htmlFor="search-input" className="text-tsm mb-2 block">
            {advertise.AuctionSearch.inputLabel}
          </label>
          <Input
            id="search-input"
            placeholder={advertise.AuctionSearch.placeholder}
            aria-label={advertise.AuctionSearch.inputAriaLabel}
            allowClear
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            hasAlert={false}
          />
        </div>
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
            style={{ marginTop: 16 }}
            height={96}
            text={{
              content: advertise.AuctionSearch.emptyStateText,
              size: 24,
            }}
          />
        )}
      </div>
    </section>
  )
}

export default AuctionSearch
