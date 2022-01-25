import * as S from './styles'
import { ButtonProps } from './types'

const Button = ({
  children,
  loading,
  disabled,
  ...props
}: ButtonProps): JSX.Element => (
  <S.Button
    {...props}
    data-loading={loading}
    disabled={loading ? true : disabled}
  >
    {loading ? <S.LoadingState role="alert" /> : children}
  </S.Button>
)

export default Button
