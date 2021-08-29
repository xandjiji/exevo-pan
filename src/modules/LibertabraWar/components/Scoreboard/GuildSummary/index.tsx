import * as S from './styles'
import { GuildSummaryProps } from './types'

const GuildSummary = ({
  guildName,
  totalKills,
  diff,
  winning,
  ...props
}: GuildSummaryProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.GuildName>{guildName}</S.GuildName>
    <S.Kills winning={winning}>
      {totalKills}
      <S.Diff title={`+${diff} since last update`}>+{diff}</S.Diff>
    </S.Kills>
    <S.Label>Kills</S.Label>
  </S.Wrapper>
)

export default GuildSummary
