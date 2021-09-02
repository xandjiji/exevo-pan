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
    xpStats: { todayDiff, lastDiff, dailyXPDiff, currentXP },
  } = warStatisticsData
  return (
    <S.Wrapper>
      <S.PageTitle>Get live statistics for Libertabra War!</S.PageTitle>

      <S.FirstRow>
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
            summaryValue: `${formatNumberWithCommas(
              Math.trunc(currentXP.guildA / 1000000),
            )}M XP`,
            dataArray: xpToDataSnapshot(dailyXPDiff.guildA),
          }}
          guildB={{
            name: 'Bones Alliance',
            summaryValue: `${formatNumberWithCommas(
              Math.trunc(currentXP.guildB / 1000000),
            )}M XP`,
            dataArray: xpToDataSnapshot(dailyXPDiff.guildB),
          }}
          tooltipSuffix="XP difference"
          dateLabelType="Date"
        />
      </S.FirstRow>
    </S.Wrapper>
  )
}

export default GuildXPGrid
