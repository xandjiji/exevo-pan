import * as S from './styles'

const TransactionId = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => (
  <S.Wrapper>
    <S.Label>Transaction ID:</S.Label>
    <S.Code>{children}</S.Code>
  </S.Wrapper>
)

export default TransactionId
