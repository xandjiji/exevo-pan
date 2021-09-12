import { useWarGuildData } from 'contexts/useDatabase'
import MembersTable from './MembersTable'
import * as S from './styles'

const SearchGrid = (): JSX.Element => {
  const { warGuildData } = useWarGuildData()

  /* @ ToDo: skeleton */
  if (warGuildData.length === 0) return <S.Loading />
  return (
    <S.Wrapper>
      <S.PageTitle>
        Search for guild members active in Libertabra War!
      </S.PageTitle>

      <MembersTable memberList={warGuildData} />
    </S.Wrapper>
  )
}

export default SearchGrid
