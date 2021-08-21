import * as S from './styles'
import { SectionProps } from './types'

const Section = ({
  id,
  title,
  children,
  ...props
}: SectionProps): JSX.Element => (
  <S.Section id={id} {...props}>
    <S.Title>
      <a href={`#${id}`}>{title}</a>
      <S.AnchorIcon />
    </S.Title>
    {children}
  </S.Section>
)

export default Section
