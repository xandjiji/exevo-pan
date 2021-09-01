import { useWarStatisticsData } from 'contexts/useDatabase'
import { formatNumberWithCommas } from 'utils'
import ScoreboardXP from './ScoreboardXP'
import ComparisonChart from '../ComparisonChart'
import { xpToDataSnapshot } from './utils'
import * as S from './styles'

const GuildXPGrid = (): JSX.Element => {
  const { warStatisticsData } = useWarStatisticsData()

  /* @ ToDo: skeleton */
  if (!warStatisticsData) return <S.Loading />
  const {
    xpStats: { todayDiff, lastDiff, dailyXP, currentXP },
  } = warStatisticsData
  return (
    <S.Wrapper>
      <S.PageTitle>Get live statistics for Libertabra War!</S.PageTitle>
      <ScoreboardXP
        guildA={{
          name: 'Libertabra Pune',
          todayDiff: todayDiff.guildA,
          lastDiff: lastDiff.guildA,
          href: 'https://www.tibia.com/community/?subtopic=guilds&page=view&order=level_desc&GuildName=Libertabra%20Pune&onlyshowonline=0',
        }}
        guildB={{
          name: 'Bones Alliance',
          todayDiff: todayDiff.guildB,
          lastDiff: lastDiff.guildB,
          href: 'https://www.tibia.com/community/?subtopic=guilds&page=view&order=level_desc&GuildName=Bones%20Alliance&onlyshowonline=0',
        }}
      />

      <ComparisonChart
        guildA={{
          name: 'Libertabra Pune',
          summaryValue: `${formatNumberWithCommas(currentXP.guildA)} total XP`,
          dataArray: xpToDataSnapshot(dailyXP.guildA),
        }}
        guildB={{
          name: 'Bones Alliance',
          summaryValue: `${formatNumberWithCommas(currentXP.guildB)} total XP`,
          dataArray: xpToDataSnapshot(dailyXP.guildB),
        }}
        tooltipSuffix="total XP"
        dateLabelType="Date"
      />
    </S.Wrapper>
  )
}

export default GuildXPGrid
