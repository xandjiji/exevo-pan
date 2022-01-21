import * as S from './styles'

const BlockSection = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <S.Wrapper>
    <S.Section {...props}>{children}</S.Section>
  </S.Wrapper>
)

export default BlockSection
