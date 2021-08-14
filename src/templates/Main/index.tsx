import Header from './Header'
import * as S from './styles'

const MasterLayout: React.FC = ({ children }): JSX.Element => (
  <S.Wrapper>
    <Header />
    {children}
  </S.Wrapper>
)

export default MasterLayout
