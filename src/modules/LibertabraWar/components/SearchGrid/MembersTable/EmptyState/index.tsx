import * as S from './styles'

const EmptyState = (): JSX.Element => (
  <S.Wrapper>
    <S.Text>No characters were found</S.Text>
    <S.NotFound />
  </S.Wrapper>
)

export default EmptyState
