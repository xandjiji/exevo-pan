import { memo } from 'react'
import { formatNumberWithCommas } from 'utils'
import * as S from './atoms'
import { BossPointsProps } from './types'

const BossPoints = ({ bossPoints, ...props }: BossPointsProps) => (
  <S.TitleWrapper {...props}>
    <S.Icons.Boss />
    Boss points: {formatNumberWithCommas(bossPoints)}
  </S.TitleWrapper>
)

export default memo(BossPoints)
