import * as S from './styles'
import { OptionProps } from './types'

const Option = ({
  children,
  value = children,
  ...props
}: OptionProps): JSX.Element => (
  <S.Option role="option" value={value} {...props}>
    {children}
  </S.Option>
)

export default Option
