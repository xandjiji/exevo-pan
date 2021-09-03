import { memo } from 'react'
import * as S from './styles'
import { ScoreboardXPProps } from './types'

const ScoreboardXP = ({
  guildA,
  guildB,
  ...props
}: ScoreboardXPProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.GuildWrapper>
      <S.GuildSummary
        guildName={guildA.name}
        href={guildA.href}
        displayNumber={Math.abs(guildA.todayDiff)}
        winning={guildA.todayDiff >= 0}
        label="Today XP"
      />

      <S.GuildSummary
        guildName={guildB.name}
        href={guildB.href}
        displayNumber={Math.abs(guildB.todayDiff)}
        winning={guildB.todayDiff >= 0}
        label="Today XP"
      />
    </S.GuildWrapper>
  </S.Wrapper>
)

export default memo(ScoreboardXP)
