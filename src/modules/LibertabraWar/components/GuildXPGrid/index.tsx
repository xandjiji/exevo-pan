import { useTranslations } from 'contexts/useTranslation'
import { formatNumberWithCommas } from 'utils'
import ScoreboardXP from './ScoreboardXP'
import ComparisonChart from '../ComparisonChart'
import { xpToDataSnapshot } from './utils'
import * as S from './styles'
import { GuildXPGridProps } from './types'

const GuildXPGrid = ({ warData }: GuildXPGridProps): JSX.Element => {
  const {
    translations: { war },
  } = useTranslations()

  const {
    xpStats: { todayDiff, dailyXPDiff, currentXP },
  } = warData

  return (
    <S.Wrapper>
      <S.PageTitle>{war.PageTitle}</S.PageTitle>

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
          title={war.GuildXPGrid.comparisonChartTitle}
          guildA={{
            name: 'Libertabra Pune',
            summaryValue: `${formatNumberWithCommas(
              Math.trunc(currentXP.guildA / 1000000),
            )}M ${war.GuildXPGrid.guildSummaryValueSuffix}`,
            dataArray: xpToDataSnapshot(dailyXPDiff.guildA),
          }}
          guildB={{
            name: 'Bones Alliance',
            summaryValue: `${formatNumberWithCommas(
              Math.trunc(currentXP.guildB / 1000000),
            )}M ${war.GuildXPGrid.guildSummaryValueSuffix}`,
            dataArray: xpToDataSnapshot(dailyXPDiff.guildB),
          }}
          tooltipSuffix={war.GuildXPGrid.comparisonChartSuffix}
          dateLabelType="Date"
        />
      </S.FirstRow>
    </S.Wrapper>
  )
}

export default GuildXPGrid
