import { useWarStatisticsData } from 'contexts/useDatabase'
import CharacterTable from './CharacterTable'
import * as S from './styles'

const Top10Grid = (): JSX.Element => {
  const { warStatisticsData } = useWarStatisticsData()

  /* @ ToDo: skeleton */
  if (!warStatisticsData) return <S.Loading />
  return (
    <S.Wrapper>
      <CharacterTable
        title="Most kills"
        subtitle="Libertabra Pune"
        characterList={warStatisticsData.top10Kills.guildA}
      />
    </S.Wrapper>
  )
}

export default Top10Grid
