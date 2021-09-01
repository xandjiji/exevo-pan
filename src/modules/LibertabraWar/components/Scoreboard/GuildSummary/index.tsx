import { getNumberSign } from 'utils'
import * as S from './styles'
import { GuildSummaryProps } from './types'

const GuildSummary = ({
  guildName,
  href,
  totalKills,
  diff,
  winning,
  ...props
}: GuildSummaryProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.GuildName>
      {guildName}
      <S.Link target="_blank" rel="noreferrer noopener" href={href}>
        <S.ExternalIcon />
      </S.Link>
    </S.GuildName>
    <S.Kills winning={winning}>
      {totalKills}
      <S.Diff
        title={`${getNumberSign(diff)}${Math.abs(diff)} since last update`}
      >
        {getNumberSign(diff)}
        {Math.abs(diff)}
      </S.Diff>
    </S.Kills>
    <S.Label>Kills</S.Label>
  </S.Wrapper>
)

export default GuildSummary
