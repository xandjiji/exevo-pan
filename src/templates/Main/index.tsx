import Header from './Header'
import * as S from './styles'
import { MainProps } from './types'

const MasterLayout = ({ children, ...props }: MainProps): JSX.Element => (
  <S.Wrapper {...props}>
    <Header />
    {children}
  </S.Wrapper>
)

export default MasterLayout
