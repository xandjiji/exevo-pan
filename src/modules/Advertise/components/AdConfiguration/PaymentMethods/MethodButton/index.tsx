import { RadioButton } from 'components/Atoms'
import * as S from './styles'
import { MethodButtonProps } from './types'

const MethodButton = ({
  active,
  icon,
  children,
  ...props
}: MethodButtonProps): JSX.Element => (
  <S.Button type="button" aria-selected={active} {...props}>
    <RadioButton active={active} tabIndex={-1}>
      <S.Content>
        {icon}
        {children}
      </S.Content>
    </RadioButton>
  </S.Button>
)

export default MethodButton
