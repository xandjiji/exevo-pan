import { useTranslations } from 'contexts/useTranslation'
import { getLastArrayElement } from 'utils'
import Scoreboard from './Scoreboard'
import LastFrags from './LastFrags'
import ComparisonChart from '../ComparisonChart'
import { onlineToDataSnapshot } from './utils'
import styles from './styles.module.css'
import { OverallGridProps } from './types'

const OverallGrid = ({ warData }: OverallGridProps) => {
  const translations = useTranslations()

  const { score, onlineCount, lastDeaths } = warData

  return (
    <article className="inner-container custom-scrollbar bg-background relative grid max-h-[calc(100%-44px)] gap-4 overflow-auto py-4 transition-colors">
      <h2 className="hidden">{translations.war.PageTitle}</h2>
      <div className={styles.firstRow}>
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
          title={translations.war.OverallGrid.comparisonChartTitle}
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
          tooltipSuffix={translations.war.OverallGrid.comparisonChartSuffix}
          dateLabelType="Time"
        />
      </div>

      <div className="child:h-fit grid grid-cols-1 gap-4 md:grid-cols-2">
        <LastFrags
          title={`${translations.war.OverallGrid.recentDeathsTitle} (${lastDeaths.guildA.length}) ⚰️`}
          subtitle="Libertabra Pune"
          fragsList={lastDeaths.guildA}
        />
        <LastFrags
          title={`${translations.war.OverallGrid.recentDeathsTitle} (${lastDeaths.guildB.length}) ⚰️`}
          subtitle="Bones Alliance"
          fragsList={lastDeaths.guildB}
        />
      </div>
    </article>
  )
}

export default OverallGrid
