import * as S from './styles'

const BlockSection = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <S.Wrapper {...props}>
    <S.Section>{children}</S.Section>
  </S.Wrapper>
)

export default BlockSection
