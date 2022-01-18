import * as S from './styles'
import { CurrentSectionProvider } from '../../../contexts/useCurrentSection'

const ContentWrapper = (
  props: React.HTMLAttributes<HTMLDivElement>,
): JSX.Element => (
  <CurrentSectionProvider>
    <S.Wrapper {...props} />
  </CurrentSectionProvider>
)

export default ContentWrapper
