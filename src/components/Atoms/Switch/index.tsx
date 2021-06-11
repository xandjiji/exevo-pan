import * as S from './styles'
import { SwitchProps } from './types'

const Switch = ({
  children,
  active,
  onClick,
  icon,
  ...props
}: SwitchProps): JSX.Element => (
  <S.Switch
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    {...props}
  >
    <S.ToggleButton active={active} hasIcon={!!icon}>
      {icon}
    </S.ToggleButton>
    {children}
  </S.Switch>
)

export default Switch
