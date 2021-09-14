import { useTranslation } from 'next-i18next'
import { memo } from 'react'
import { formatNumberWithCommas } from 'utils/formatNumberWithCommas'
import * as S from './styles'
import { SummaryProps } from './types'

const Summary = ({
  title,
  value,
  percentage,
  positive = true,
  ...props
}: SummaryProps): JSX.Element => {
  const { t } = useTranslation('statistics')

  return (
    <S.Wrapper {...props}>
      <S.Title>{title}</S.Title>
      <S.Value>{`${formatNumberWithCommas(value)} TC`}</S.Value>
      <S.Percentage positive={positive}>
        <S.TrendIcon
          aria-label={t(
            `Summary.${positive ? 'positiveTrendLabel' : 'negativeTrendLabel'}`,
          )}
        />
        {`${percentage.toFixed(2)}%`}
      </S.Percentage>
    </S.Wrapper>
  )
}

export default memo(Summary)
