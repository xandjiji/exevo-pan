import * as S from './styles'

const EmptyState = (): JSX.Element => (
  <S.Wrapper>
    <S.Text>No auction was found</S.Text>
    <S.NotFound alt="No auction was found" />
  </S.Wrapper>
)

export default EmptyState
