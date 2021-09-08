import Header from './Header'
import KwaiVerticalBanner from './KwaiVerticalBanner'
import InPagePush from './InPagePush'
import * as S from './styles'
import { MainProps } from './types'

const MasterLayout = ({ children, ...props }: MainProps): JSX.Element => (
  <S.Wrapper {...props}>
    <Header />
    <KwaiVerticalBanner />
    <InPagePush />
    {children}
  </S.Wrapper>
)

export default MasterLayout
