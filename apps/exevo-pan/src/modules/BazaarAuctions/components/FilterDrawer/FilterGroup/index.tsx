import { memo } from 'react'
import * as S from './styles'
import { FilterGroupProps } from './types'

const FilterGroup = ({
  newSticker = false,
  label,
  labelSuffix,
  htmlFor,
  children,
  ...props
}: FilterGroupProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.LabelWrapper>
      <S.Label htmlFor={htmlFor}>
        {newSticker && <S.Sticker localStorageKey={label}>New</S.Sticker>}
        {label}
      </S.Label>
      {labelSuffix}
    </S.LabelWrapper>
    {children}
  </S.Wrapper>
)

export default memo(FilterGroup)
