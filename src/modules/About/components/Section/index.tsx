import * as S from './styles'
import { SectionProps } from './types'

const Section = ({ title, children, ...props }: SectionProps): JSX.Element => (
  <S.Section {...props}>
    <S.Title>{title}</S.Title>
    {children}
  </S.Section>
)

export default Section
