import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'
import { Top10GridProps } from './types'

const Top10Grid = ({ warData }: Top10GridProps): JSX.Element => {
  const {
    translations: { war },
  } = useTranslations()

  return (
    <S.Wrapper>
      <S.KillsTable
        title={`${war.Top10Grid.mostKillsTitle} ⚔️`}
        subtitle="Libertabra Pune"
        caption={`Libertabra Pune ${war.Top10Grid.mostKillsCaptionSuffix}`}
        characterList={warData.top10Kills.guildA}
      />
      <S.KillsTable
        title={`${war.Top10Grid.mostKillsTitle} ⚔️`}
        subtitle="Bones Alliance"
        caption={`Bones Alliance ${war.Top10Grid.mostKillsCaptionSuffix}`}
        characterList={warData.top10Kills.guildB}
      />

      <S.DeathsTable
        title={`${war.Top10Grid.mostDeathsTitle} 💀`}
        subtitle="Libertabra Pune"
        caption={`Libertabra Pune ${war.Top10Grid.mostDeathsCaptionSuffix}`}
        characterList={warData.top10Deaths.guildA}
      />
      <S.DeathsTable
        title={`${war.Top10Grid.mostDeathsTitle} 💀`}
        subtitle="Bones Alliance"
        caption={`Bones Alliance ${war.Top10Grid.mostDeathsCaptionSuffix}`}
        characterList={warData.top10Deaths.guildB}
      />
    </S.Wrapper>
  )
}

export default Top10Grid
