import * as S from './styles'
import { LoadingAlertProps } from './types'

const LoadingAlert = ({ children }: LoadingAlertProps): JSX.Element => (
  <S.FloatingLabel>
    <S.Spinner />
    {children}
  </S.FloatingLabel>
)

export default LoadingAlert
