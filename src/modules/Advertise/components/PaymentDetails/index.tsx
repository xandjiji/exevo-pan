import { useTranslations } from 'contexts/useTranslation'
import { useForm } from '../../contexts/Form'
import TransactionId from './TransactionId'
import CoinsPayment from './CoinsPayment'
import PixPayment from './PixPayment'
import Summary from '../Summary'
import * as S from './styles'

const PaymentDetails = (): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { uuid, email, paymentMethod } = useForm()

  return (
    <S.Wrapper>
      <S.TransactionInformation>
        <S.Title>
          <S.ReceiptIcon aria-label={advertise.PaymentDetails.titleIconLabel} />
          {advertise.PaymentDetails.title}
        </S.Title>
        <TransactionId>{uuid}</TransactionId>

        <S.Text>
          {advertise.PaymentDetails.emailText1}{' '}
          <S.Strong>{email.value}</S.Strong>{' '}
          {advertise.PaymentDetails.emailText2}{' '}
          <span role="img" aria-label={advertise.PaymentDetails.emojiLabel}>
            😄
          </span>
        </S.Text>

        {paymentMethod === 'TIBIA_COINS' ? <CoinsPayment /> : <PixPayment />}

        <S.Small>{advertise.PaymentDetails.smallDisclaimer}</S.Small>
      </S.TransactionInformation>
      <Summary />
    </S.Wrapper>
  )
}

export default PaymentDetails
