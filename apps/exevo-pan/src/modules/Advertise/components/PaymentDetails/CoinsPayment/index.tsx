import { useTranslations } from 'contexts/useTranslation'
import { advertising } from 'Constants'
import { useForm } from '../../../contexts/Form'
import { calculatePrice, readablePrice } from '../../../utils'
import * as S from './styles'

const CoinsPayment = (): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { selectedDates, paymentCharacter } = useForm()

  return (
    <>
      <S.Text>
        {advertise.PaymentDetails.CoinsPayment.instruction}{' '}
        <S.Strong>
          {readablePrice.full.TIBIA_COINS(
            calculatePrice(selectedDates.length, 'TIBIA_COINS').totalPrice,
          )}
        </S.Strong>{' '}
        {advertise.PaymentDetails.CoinsPayment.from}{' '}
        <S.Strong>{paymentCharacter.value}</S.Strong>{' '}
        {advertise.PaymentDetails.CoinsPayment.to}{' '}
        <S.Link
          href={`https://www.tibia.com/community/?name=${advertising.BANK_CHARACTER}`}
          target="_blank"
          rel="noreferrer noopener external"
        >
          {advertising.BANK_CHARACTER}
        </S.Link>
        <S.CopyButton copyString={advertising.BANK_CHARACTER} />
      </S.Text>
    </>
  )
}

export default CoinsPayment
