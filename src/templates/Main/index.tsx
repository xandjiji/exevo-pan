import Header from './Header'
import Content from './Content'
import * as S from './styles'
import { MainProps } from './types'

const MasterLayout = ({ children, ...props }: MainProps): JSX.Element => (
  <S.Wrapper {...props}>
    <Header />
    <Content />
    {children}
  </S.Wrapper>
)

export default MasterLayout
