import { memo } from 'react'
import { formatNumberWithCommas } from 'utils'
import * as S from './atoms'
import { CharacterAchievementsProps } from './types'

const CharacterAchievements = ({
  achievementPoints,
  ...props
}: CharacterAchievementsProps) => (
  <S.TitleWrapper {...props}>
    <S.Icons.Achievements />
    Achievement points: {formatNumberWithCommas(achievementPoints)}
  </S.TitleWrapper>
)

export default memo(CharacterAchievements)
