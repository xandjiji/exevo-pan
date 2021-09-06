import { memo } from 'react'
import { formatNumberWithCommas } from 'utils'
import { formatDiffValue } from './utils'
import GuildSummary from '../../GuildSummary'
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
        displayValue={formatNumberWithCommas(guildA.kills)}
        diffText={formatDiffValue(guildA.diff)}
        winning={guildA.kills >= guildB.kills}
        label="Kills"
      />

      <GuildSummary
        guildName={guildB.name}
        href={guildB.href}
        displayValue={formatNumberWithCommas(guildB.kills)}
        diffText={formatDiffValue(guildB.diff)}
        winning={guildB.kills >= guildA.kills}
        label="Kills"
      />
    </S.GuildWrapper>
  </S.Wrapper>
)

export default memo(Scoreboard)
