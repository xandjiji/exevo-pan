import { memo } from 'react'
import * as S from './styles'
import { FilterGroupProps } from './types'

const FilterGroup = ({
  label,
  labelSuffix,
  htmlFor,
  children,
  ...props
}: FilterGroupProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.LabelWrapper>
      <S.Label htmlFor={htmlFor}>{label}</S.Label>
      {labelSuffix}
    </S.LabelWrapper>
    {children}
  </S.Wrapper>
)

export default memo(FilterGroup)
