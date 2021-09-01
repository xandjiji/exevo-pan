import { memo } from 'react'
import GuildSummary from '../../GuildSummary'
import * as S from './styles'
import { ScoreboardXPProps } from './types'

const ScoreboardXP = ({
  guildA,
  guildB,
  ...props
}: ScoreboardXPProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.GuildWrapper>
      <GuildSummary
        guildName={guildA.name}
        href={guildA.href}
        displayNumber={guildA.todayDiff}
        diff={guildA.lastDiff}
        winning={guildA.todayDiff >= 0}
        label="Today XP"
      />

      <GuildSummary
        guildName={guildB.name}
        href={guildB.href}
        displayNumber={guildB.todayDiff}
        diff={guildB.lastDiff}
        winning={guildB.todayDiff >= 0}
        label="Today XP"
      />
    </S.GuildWrapper>
  </S.Wrapper>
)

export default memo(ScoreboardXP)
