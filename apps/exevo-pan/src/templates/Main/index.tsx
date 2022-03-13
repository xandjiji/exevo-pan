import Header from './Header'
import Footer from './Footer'
import * as S from './styles'
import { MainProps } from './types'

const MasterLayout = ({ children, ...props }: MainProps): JSX.Element => (
  <S.Wrapper {...props}>
    <Header />
    {children}
    <Footer />
  </S.Wrapper>
)

export default MasterLayout
