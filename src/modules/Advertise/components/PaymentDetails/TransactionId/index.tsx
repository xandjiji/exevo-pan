import * as S from './styles'

const TransactionId = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => (
  <S.Wrapper>
    <S.Label>Transaction ID:</S.Label>
    <S.Id>{children}</S.Id>
  </S.Wrapper>
)

export default TransactionId
