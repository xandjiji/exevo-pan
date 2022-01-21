import * as S from './styles'
import { CurrentSectionProvider } from '../../../contexts/useCurrentSection'

const Layout = (props: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <CurrentSectionProvider>
    <S.Wrapper {...props} />
  </CurrentSectionProvider>
)

export default Layout
