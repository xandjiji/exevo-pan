import * as S from './styles'
import { OptionProps } from './types'

const Option = ({
  children,
  value = children,
  isSelected,
  highlighted = false,
  onClick,
  ...props
}: OptionProps): JSX.Element => (
  <S.Option
    role="option"
    value={value}
    aria-selected={isSelected}
    highlighted={highlighted}
    onClick={() => onClick?.({ name: children, value })}
    {...props}
  >
    {children}
  </S.Option>
)

export default Option
