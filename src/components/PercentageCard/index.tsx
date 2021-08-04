import * as S from './styles'
import { PercentageCardProps } from './types'

const PercentageCard = ({
  title,
  percentage,
}: PercentageCardProps): JSX.Element => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>
    <S.Percentage positive={percentage >= 50}>{percentage}%</S.Percentage>
  </S.Wrapper>
)

export default PercentageCard
