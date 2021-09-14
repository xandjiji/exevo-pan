import { useTranslation } from 'next-i18next'
import { useWarGuildData } from 'contexts/useDatabase'
import MembersTable from './MembersTable'
import * as S from './styles'

const SearchGrid = (): JSX.Element => {
  const { t } = useTranslation('war')

  const { warGuildData } = useWarGuildData()

  /* @ ToDo: skeleton */
  if (warGuildData.length === 0) return <S.Loading />
  return (
    <S.Wrapper>
      <S.PageTitle>{t('SearchGrid.Title')}</S.PageTitle>

      <MembersTable memberList={warGuildData} />
    </S.Wrapper>
  )
}

export default SearchGrid
