import { useWarStatisticsData } from 'contexts/useDatabase'
import * as S from './styles'

const Top10Grid = (): JSX.Element => {
  const { warStatisticsData } = useWarStatisticsData()

  if (!warStatisticsData) return <S.Loading />
  return (
    <S.Wrapper>
      <S.KillsTable
        title="Most kills ⚔️"
        subtitle="Libertabra Pune"
        characterList={warStatisticsData.top10Kills.guildA}
      />
      <S.KillsTable
        title="Most kills ⚔️"
        subtitle="Bones Alliance"
        characterList={warStatisticsData.top10Kills.guildB}
      />

      <S.DeathsTable
        title="Most deaths 💀"
        subtitle="Libertabra Pune"
        characterList={warStatisticsData.top10Deaths.guildA}
      />
      <S.DeathsTable
        title="Most deaths 💀"
        subtitle="Bones Alliance"
        characterList={warStatisticsData.top10Deaths.guildB}
      />
    </S.Wrapper>
  )
}

export default Top10Grid
