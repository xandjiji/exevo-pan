import { useTranslations } from 'contexts/useTranslation'
import { useWarGuildData } from 'contexts/useDatabase'
import MembersTable from './MembersTable'

const SearchGrid = () => {
  const { war } = useTranslations()

  const { warGuildData } = useWarGuildData()

  if (warGuildData.length === 0) {
    return (
      <div
        role="alert"
        className="loading-spinner z-1 absolute-centered fixed"
      />
    )
  }

  return (
    <article className="inner-container custom-scrollbar bg-background relative max-h-[calc(100%-44px)] overflow-auto py-4 transition-colors">
      <h2 className="hidden">{war.SearchGrid.Title}</h2>

      <MembersTable memberList={warGuildData} />
    </article>
  )
}

export default SearchGrid
