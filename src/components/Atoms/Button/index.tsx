import * as S from './styles'
import { ButtonProps } from './types'

const Button = ({ ...props }: ButtonProps): JSX.Element => (
  <S.Button {...props} />
)

export default Button
