import { memo } from 'react'
import { formatNumberWithCommas } from 'utils'
import * as S from './styles'
import { CharacterAchievementsProps } from './types'

const CharacterAchievements = ({
  achievementPoints,
  ...props
}: CharacterAchievementsProps): JSX.Element => (
  <S.TitleWrapper {...props}>
    <S.Icons.Achievements />
    Achievement points: {formatNumberWithCommas(achievementPoints)}
  </S.TitleWrapper>
)

export default memo(CharacterAchievements)
