import { useTranslation } from 'next-i18next'
import * as S from './styles'
import { Top10GridProps } from './types'

const Top10Grid = ({ warData }: Top10GridProps): JSX.Element => {
  const { t } = useTranslation('war')

  return (
    <S.Wrapper>
      <S.KillsTable
        title={`${t('Top10Grid.mostKillsTitle')} ⚔️`}
        subtitle="Libertabra Pune"
        caption={`Libertabra Pune ${t('Top10Grid.mostKillsCaptionSuffix')}`}
        characterList={warData.top10Kills.guildA}
      />
      <S.KillsTable
        title={`${t('Top10Grid.mostKillsTitle')} ⚔️`}
        subtitle="Bones Alliance"
        caption={`Bones Alliance ${t('Top10Grid.mostKillsCaptionSuffix')}`}
        characterList={warData.top10Kills.guildB}
      />

      <S.DeathsTable
        title={`${t('Top10Grid.mostDeathsTitle')} 💀`}
        subtitle="Libertabra Pune"
        caption={`Libertabra Pune ${t('Top10Grid.mostDeathsCaptionSuffix')}`}
        characterList={warData.top10Deaths.guildA}
      />
      <S.DeathsTable
        title={`${t('Top10Grid.mostDeathsTitle')} 💀`}
        subtitle="Bones Alliance"
        caption={`Bones Alliance ${t('Top10Grid.mostDeathsCaptionSuffix')}`}
        characterList={warData.top10Deaths.guildB}
      />
    </S.Wrapper>
  )
}

export default Top10Grid
