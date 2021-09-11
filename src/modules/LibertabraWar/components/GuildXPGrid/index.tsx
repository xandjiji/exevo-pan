import { formatNumberWithCommas } from 'utils'
import ScoreboardXP from './ScoreboardXP'
import ComparisonChart from '../ComparisonChart'
import { xpToDataSnapshot } from './utils'
import * as S from './styles'
import { GuildXPGridProps } from './types'

const GuildXPGrid = ({ warData }: GuildXPGridProps): JSX.Element => {
  const {
    xpStats: { todayDiff, dailyXPDiff, currentXP },
  } = warData
  return (
    <S.Wrapper>
      <S.PageTitle>Get live statistics for Libertabra War!</S.PageTitle>

      <S.FirstRow>
        <ScoreboardXP
          guildA={{
            name: 'Libertabra Pune',
            todayDiff: todayDiff.guildA,
            href: 'https://www.tibia.com/community/?subtopic=guilds&page=view&order=level_desc&GuildName=Libertabra%20Pune&onlyshowonline=0',
          }}
          guildB={{
            name: 'Bones Alliance',
            todayDiff: todayDiff.guildB,
            href: 'https://www.tibia.com/community/?subtopic=guilds&page=view&order=level_desc&GuildName=Bones%20Alliance&onlyshowonline=0',
          }}
        />

        <ComparisonChart
          title="Comparing daily XP gain or loss between Libertabra Pune and Bones Alliance"
          guildA={{
            name: 'Libertabra Pune',
            summaryValue: `${formatNumberWithCommas(
              Math.trunc(currentXP.guildA / 1000000),
            )}M total XP`,
            dataArray: xpToDataSnapshot(dailyXPDiff.guildA),
          }}
          guildB={{
            name: 'Bones Alliance',
            summaryValue: `${formatNumberWithCommas(
              Math.trunc(currentXP.guildB / 1000000),
            )}M total XP`,
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
