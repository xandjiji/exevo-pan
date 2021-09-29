import { useForm } from '../../contexts/Form'
import TransactionId from './TransactionId'
import CoinsPayment from './CoinsPayment'
import Summary from '../Summary'
import * as S from './styles'

const uuid = '23438b05-31d5-45b1-ae6c-55d6e35c2d6d'

const PaymentDetails = (): JSX.Element => {
  const { email } = useForm()

  return (
    <S.Wrapper>
      <S.TransactionInformation>
        <S.Title>
          <S.ReceiptIcon aria-label="Successful checkout" />
          Your order was placed!
        </S.Title>
        <TransactionId>{uuid}</TransactionId>

        <S.Text>
          An email was sent to <S.Strong>{email.value}</S.Strong> containing the
          order details.
        </S.Text>

        <CoinsPayment />

        <S.Small>
          If the purchase can&apos;t be completed, you will receive a refund.
        </S.Small>
      </S.TransactionInformation>
      <Summary />
    </S.Wrapper>
  )
}

export default PaymentDetails
