import { memo } from 'react'
import * as S from './styles'
import { PercentageCardProps } from './types'

const PercentageCard = ({
  title,
  percentage,
  ...props
}: PercentageCardProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.Title>{title}</S.Title>
    <S.Percentage positive={percentage >= 50}>{percentage}%</S.Percentage>
  </S.Wrapper>
)

export default memo(PercentageCard)
