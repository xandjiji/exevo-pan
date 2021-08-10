import * as S from './styles'
import { LoadingAlertProps } from './types'

const LoadingAlert = ({
  children,
  ...props
}: LoadingAlertProps): JSX.Element => (
  <S.FloatingLabel role="alert" {...props}>
    <S.Spinner />
    {children}
  </S.FloatingLabel>
)

export default LoadingAlert
