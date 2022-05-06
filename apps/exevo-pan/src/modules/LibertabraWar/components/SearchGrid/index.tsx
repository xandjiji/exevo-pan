import { useTranslations } from 'contexts/useTranslation'
import { useWarGuildData } from 'contexts/useDatabase'
import MembersTable from './MembersTable'

const SearchGrid = () => {
  const {
    translations: { war },
  } = useTranslations()

  const { warGuildData } = useWarGuildData()

  if (warGuildData.length === 0) {
    return (
      <div
        className="loading-spinner z-1 fixed top-1/2 left-1/2"
        style={{ transform: 'translate(-50%, -50%)' }}
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
