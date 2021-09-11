import * as S from './styles'
import { Top10GridProps } from './types'

const Top10Grid = ({ warData }: Top10GridProps): JSX.Element => (
  <S.Wrapper>
    <S.KillsTable
      title="Most kills ⚔️"
      subtitle="Libertabra Pune"
      characterList={warData.top10Kills.guildA}
    />
    <S.KillsTable
      title="Most kills ⚔️"
      subtitle="Bones Alliance"
      characterList={warData.top10Kills.guildB}
    />

    <S.DeathsTable
      title="Most deaths 💀"
      subtitle="Libertabra Pune"
      characterList={warData.top10Deaths.guildA}
    />
    <S.DeathsTable
      title="Most deaths 💀"
      subtitle="Bones Alliance"
      characterList={warData.top10Deaths.guildB}
    />
  </S.Wrapper>
)

export default Top10Grid
