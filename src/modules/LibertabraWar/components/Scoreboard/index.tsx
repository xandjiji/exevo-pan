import { memo } from 'react'
import GuildSummary from './GuildSummary'
import * as S from './styles'
import { ScoreboardProps } from './types'

const Scoreboard = ({
  guildA,
  guildB,
  ...props
}: ScoreboardProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.GuildWrapper>
      <GuildSummary
        guildName={guildA.name}
        href={guildA.href}
        totalKills={guildA.kills}
        diff={guildA.diff}
        winning={guildA.kills >= guildB.kills}
      />

      <GuildSummary
        guildName={guildB.name}
        href={guildB.href}
        totalKills={guildB.kills}
        diff={guildB.diff}
        winning={guildB.kills >= guildA.kills}
      />
    </S.GuildWrapper>
  </S.Wrapper>
)

export default memo(Scoreboard)
