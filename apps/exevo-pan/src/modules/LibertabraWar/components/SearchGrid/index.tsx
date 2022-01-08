import { useTranslations } from 'contexts/useTranslation'
import { useWarGuildData } from 'contexts/useDatabase'
import MembersTable from './MembersTable'
import * as S from './styles'

const SearchGrid = (): JSX.Element => {
  const {
    translations: { war },
  } = useTranslations()

  const { warGuildData } = useWarGuildData()

  /* @ ToDo: skeleton */
  if (warGuildData.length === 0) return <S.Loading />
  return (
    <S.Wrapper>
      <S.PageTitle>{war.SearchGrid.Title}</S.PageTitle>

      <MembersTable memberList={warGuildData} />
    </S.Wrapper>
  )
}

export default SearchGrid
