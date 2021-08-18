import Header from './Header'
import * as S from './styles'

const MasterLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => (
  <S.Wrapper>
    <Header />
    {children}
  </S.Wrapper>
)

export default MasterLayout
