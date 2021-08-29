import { useWarStatisticsData } from 'contexts/useDatabase'
import Scoreboard from '../Scoreboard'
import OnlineChart from '../OnlineChart'
import * as S from './styles'

const OverallGrid = (): JSX.Element => {
  const { warStatisticsData } = useWarStatisticsData()

  /* @ ToDo: skeleton */
  if (!warStatisticsData) return <div>loading...</div>
  const { score, onlineCount } = warStatisticsData
  return (
    <S.Wrapper>
      <S.PageTitle>Get live statistics for Libertabra War!</S.PageTitle>
      <Scoreboard
        guildA={{
          name: 'Libertabra Pune',
          kills: score.guildA,
          diff: score.diffGuildA,
        }}
        guildB={{
          name: 'Bones Alliance',
          kills: score.guildB,
          diff: score.diffGuildB,
        }}
      />
      <OnlineChart
        guildA={{
          name: 'Libertabra Pune',
          online: onlineCount.guildA,
        }}
        guildB={{
          name: 'Bones Alliance',
          online: onlineCount.guildB,
        }}
      />
    </S.Wrapper>
  )
}

export default OverallGrid
