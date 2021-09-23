import { RadioButton } from 'components/Atoms'
import * as S from './styles'
import { PaymentMethodProps } from './types'

const PaymentMethod = ({
  active,
  icon,
  children,
  ...props
}: PaymentMethodProps): JSX.Element => (
  <S.Button type="button" aria-selected={active} {...props}>
    <RadioButton active={active}>
      <S.Content>
        {icon}
        {children}
      </S.Content>
    </RadioButton>
  </S.Button>
)

export default PaymentMethod
