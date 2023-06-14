import { useTranslations } from 'contexts/useTranslation'
import CharacterTable from './CharacterTable'
import styles from './styles.module.css'
import { Top10GridProps } from './types'

const Top10Grid = ({ warData }: Top10GridProps) => {
  const { war } = useTranslations()

  return (
    <article
      className="inner-container custom-scrollbar bg-background relative grid grid-cols-[repeat(auto-fit,minmax(0,440px))] justify-center gap-4 overflow-auto pt-4 transition-colors after:col-span-full after:h-4 md:grid-cols-2 2xl:grid-cols-4"
      style={{
        maxHeight: 'calc(100% - 44px)',
      }}
    >
      <CharacterTable
        className={styles.killTable}
        title={`${war.Top10Grid.mostKillsTitle} ⚔️`}
        subtitle="Libertabra Pune"
        caption={`Libertabra Pune ${war.Top10Grid.mostKillsCaptionSuffix}`}
        characterList={warData.top10Kills.guildA}
      />
      <CharacterTable
        className={styles.killTable}
        title={`${war.Top10Grid.mostKillsTitle} ⚔️`}
        subtitle="Bones Alliance"
        caption={`Bones Alliance ${war.Top10Grid.mostKillsCaptionSuffix}`}
        characterList={warData.top10Kills.guildB}
      />

      <CharacterTable
        className={styles.deathTable}
        title={`${war.Top10Grid.mostDeathsTitle} 💀`}
        subtitle="Libertabra Pune"
        caption={`Libertabra Pune ${war.Top10Grid.mostDeathsCaptionSuffix}`}
        characterList={warData.top10Deaths.guildA}
      />
      <CharacterTable
        className={styles.deathTable}
        title={`${war.Top10Grid.mostDeathsTitle} 💀`}
        subtitle="Bones Alliance"
        caption={`Bones Alliance ${war.Top10Grid.mostDeathsCaptionSuffix}`}
        characterList={warData.top10Deaths.guildB}
      />
    </article>
  )
}

export default Top10Grid
