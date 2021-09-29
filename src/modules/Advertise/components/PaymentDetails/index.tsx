import TransactionId from './TransactionId'
import * as S from './styles'

const uuid = '23438b05-31d5-45b1-ae6c-55d6e35c2d6d'

const PaymentDetails = (): JSX.Element => (
  <S.Wrapper>
    <S.Title>
      <S.ReceiptIcon aria-label="Successful checkout" />
      Your order was placed!
    </S.Title>
    <TransactionId>{uuid}</TransactionId>
  </S.Wrapper>
)

export default PaymentDetails
