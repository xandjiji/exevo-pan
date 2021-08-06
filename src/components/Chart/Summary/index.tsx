import { memo } from 'react'
import { formatNumberWithCommas } from 'utils/formatNumberWithCommas'
import * as S from './styles'
import { SummaryProps } from './types'

const Summary = ({
  title,
  value,
  percentage,
  positive = true,
}: SummaryProps): JSX.Element => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>
    <S.Value>{`${formatNumberWithCommas(value)} TC`}</S.Value>
    <S.Percentage positive={positive}>
      <S.TrendIcon
        aria-label={positive ? 'Upwards trend' : 'Downwards trend'}
      />
      {`${percentage.toFixed(2)}%`}
    </S.Percentage>
  </S.Wrapper>
)

export default memo(Summary)
