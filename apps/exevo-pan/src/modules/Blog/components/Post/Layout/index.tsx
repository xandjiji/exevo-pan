import * as S from './styles'
import { CurrentSectionProvider } from '../../../contexts/useCurrentSection'

const Layout = (props: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <CurrentSectionProvider>
    <S.Wrapper {...props} />
  </CurrentSectionProvider>
)

Layout.Center = S.Center
Layout.Left = S.Left
Layout.Right = S.Right

export default Layout
