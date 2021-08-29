import { memo } from 'react'
import * as S from './styles'
import { ScoreboardProps } from './types'

const Scoreboard = ({
  guildA,
  guildB,
  ...props
}: ScoreboardProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.GuildWrapper>
      <S.GuildName>{guildA.name}</S.GuildName>
      <S.ScoreCount winning={guildA.kills >= guildB.kills}>
        {guildA.kills}
        <S.DiffCount>+{guildA.diff}</S.DiffCount>
      </S.ScoreCount>
      <S.Label>Kills</S.Label>
    </S.GuildWrapper>
    <S.VsIcon />
    <S.GuildWrapper>
      <S.GuildName>{guildB.name}</S.GuildName>
      <S.ScoreCount winning={guildB.kills >= guildA.kills}>
        {guildB.kills}
        <S.DiffCount title={`+${guildB.diff} since last update`}>
          +{guildB.diff}
        </S.DiffCount>
      </S.ScoreCount>
      <S.Label>Kills</S.Label>
    </S.GuildWrapper>
  </S.Wrapper>
)

export default memo(Scoreboard)
