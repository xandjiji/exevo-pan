import { memo } from 'react'
import { formatDisplayValue } from './utils'
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
        displayValue={formatDisplayValue(guildA.todayDiff)}
        winning={guildA.todayDiff >= 0}
        label="Today XP"
      />

      <S.GuildSummary
        guildName={guildB.name}
        href={guildB.href}
        displayValue={formatDisplayValue(guildB.todayDiff)}
        winning={guildB.todayDiff >= 0}
        label="Today XP"
      />
    </S.GuildWrapper>
  </S.Wrapper>
)

export default memo(ScoreboardXP)
