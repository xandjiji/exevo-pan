import { useWarStatisticsData } from 'contexts/useDatabase'
import { getLastArrayElement } from 'utils'
import Scoreboard from './Scoreboard'
import ComparisonChart from '../ComparisonChart'
import { onlineToDataSnapshot } from './utils'
import * as S from './styles'

const OverallGrid = (): JSX.Element => {
  const { warStatisticsData } = useWarStatisticsData()

  /* @ ToDo: skeleton */
  if (!warStatisticsData) return <S.Loading />
  const { score, onlineCount } = warStatisticsData
  return (
    <S.Wrapper>
      <S.PageTitle>Get live statistics for Libertabra War!</S.PageTitle>
      <S.FirstRow>
        <Scoreboard
          guildA={{
            name: 'Libertabra Pune',
            kills: score.guildA,
            diff: score.diffGuildA,
            href: 'https://www.tibia.com/community/?subtopic=guilds&page=view&order=level_desc&GuildName=Libertabra%20Pune&onlyshowonline=0',
          }}
          guildB={{
            name: 'Bones Alliance',
            kills: score.guildB,
            diff: score.diffGuildB,
            href: 'https://www.tibia.com/community/?subtopic=guilds&page=view&order=level_desc&GuildName=Bones%20Alliance&onlyshowonline=0',
          }}
        />
        <ComparisonChart
          guildA={{
            name: 'Libertabra Pune',
            summaryValue: `${
              getLastArrayElement(onlineCount.guildA).count
            } online`,
            dataArray: onlineToDataSnapshot(onlineCount.guildA),
          }}
          guildB={{
            name: 'Bones Alliance',
            summaryValue: `${
              getLastArrayElement(onlineCount.guildB).count
            } online`,
            dataArray: onlineToDataSnapshot(onlineCount.guildB),
          }}
          tooltipSuffix="members online"
          dateLabelType="Time"
        />
      </S.FirstRow>
    </S.Wrapper>
  )
}

export default OverallGrid
