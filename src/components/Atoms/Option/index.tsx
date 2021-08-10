import { memo } from 'react'
import * as S from './styles'
import { OptionProps } from './types'

const Option = ({
  children,
  value = children,
  highlighted = false,
  onClick,
  ...props
}: OptionProps): JSX.Element => (
  <S.Option
    role="option"
    value={value}
    highlighted={highlighted}
    onClick={() => onClick?.({ name: children, value })}
    {...props}
  >
    {children}
  </S.Option>
)

export default memo(Option)
