import { pricing } from 'Constants'
import { copyToClipboard } from 'utils'
import { useForm } from '../../../contexts/Form'
import * as S from './styles'

const CoinsPayment = (): JSX.Element => {
  const { selectedDates, paymentCharacter } = useForm()

  return (
    <>
      <S.Text>
        Please complete your order sending{' '}
        <S.Strong>
          {selectedDates.length * pricing.TIBIA_COINS_ADVERTISE} Tibia Coins
        </S.Strong>{' '}
        from <S.Strong>{paymentCharacter.value}</S.Strong> to{' '}
        <S.Link
          href="https://www.tibia.com/community/?name=Ksu"
          target="_blank"
          rel="noreferrer noopener external"
        >
          Ksu
        </S.Link>
        <S.CopyIcon onClick={() => copyToClipboard('Ksu')} />
      </S.Text>
    </>
  )
}

export default CoinsPayment
