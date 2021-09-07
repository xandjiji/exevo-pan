import * as S from './styles'
import { LabelGroupProps } from './types'

const LabelGroup = ({
  label,
  htmlFor,
  children,
  ...props
}: LabelGroupProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.Label htmlFor={htmlFor}>{label}</S.Label>
    {children}
  </S.Wrapper>
)

export default LabelGroup
