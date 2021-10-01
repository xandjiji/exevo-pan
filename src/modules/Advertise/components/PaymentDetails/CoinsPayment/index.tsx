import { advertising } from 'Constants'
import { useForm } from '../../../contexts/Form'
import * as S from './styles'

const CoinsPayment = (): JSX.Element => {
  const { selectedDates, paymentCharacter } = useForm()

  return (
    <>
      <S.Text>
        Please complete your order sending{' '}
        <S.Strong>
          {selectedDates.length * advertising.TIBIA_COINS_ADVERTISE} Tibia Coins
        </S.Strong>{' '}
        from <S.Strong>{paymentCharacter.value}</S.Strong> to{' '}
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
