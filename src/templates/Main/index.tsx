import Header from './Header'
import KwaiVerticalBanner from './KwaiVerticalBanner'
import * as S from './styles'
import { MainProps } from './types'

const MasterLayout = ({ children, ...props }: MainProps): JSX.Element => (
  <S.Wrapper {...props}>
    <Header />
    <KwaiVerticalBanner />
    {children}
  </S.Wrapper>
)

export default MasterLayout
