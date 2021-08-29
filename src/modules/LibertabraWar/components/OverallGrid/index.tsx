import { useWarStatisticsData } from 'contexts/useDatabase'
import Scoreboard from '../Scoreboard'
import * as S from './styles'

const OverallGrid = (): JSX.Element => {
  const { warStatisticsData } = useWarStatisticsData()

  /* @ ToDo: skeleton */
  if (!warStatisticsData) return <div>loading...</div>
  return (
    <S.Wrapper>
      <S.PageTitle>Get live statistics for Libertabra War!</S.PageTitle>
      <Scoreboard
        guildA={{
          name: 'Libertabra Pune',
          kills: warStatisticsData.score.guildA,
        }}
        guildB={{
          name: 'Bones Alliance',
          kills: warStatisticsData.score.guildB,
        }}
      />
    </S.Wrapper>
  )
}

export default OverallGrid
