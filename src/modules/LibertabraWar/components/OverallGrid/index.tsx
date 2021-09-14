import { useTranslation } from 'next-i18next'
import { getLastArrayElement } from 'utils'
import Scoreboard from './Scoreboard'
import LastFrags from './LastFrags'
import ComparisonChart from '../ComparisonChart'
import { onlineToDataSnapshot } from './utils'
import * as S from './styles'
import { OverallGridProps } from './types'

const OverallGrid = ({ warData }: OverallGridProps): JSX.Element => {
  const { t } = useTranslation('war')

  const { score, onlineCount, lastDeaths } = warData

  return (
    <S.Wrapper>
      <S.PageTitle>{t('PageTitle')}</S.PageTitle>
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
          title={t('OverallGrid.comparisonChartTitle')}
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
          tooltipSuffix={t('OverallGrid.comparisonChartSuffix')}
          dateLabelType="Time"
        />
      </S.FirstRow>

      <S.SecondRow>
        <LastFrags
          title={`${t('OverallGrid.recentDeathsTitle')} (${
            lastDeaths.guildA.length
          }) ⚰️`}
          subtitle="Libertabra Pune"
          fragsList={lastDeaths.guildA}
        />
        <LastFrags
          title={`${t('OverallGrid.recentDeathsTitle')} (${
            lastDeaths.guildB.length
          }) ⚰️`}
          subtitle="Bones Alliance"
          fragsList={lastDeaths.guildB}
        />
      </S.SecondRow>
    </S.Wrapper>
  )
}

export default OverallGrid
