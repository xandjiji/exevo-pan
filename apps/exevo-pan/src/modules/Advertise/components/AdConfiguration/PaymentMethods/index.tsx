import Image from 'next/image'
import TibiaCoinsSrc from 'assets/tibiaCoins.gif'
import PixSrc from 'assets/pix.png'
import MethodButton from './MethodButton'
import { useForm } from '../../../contexts/Form'
import * as S from './styles'

const PaymentMethods = (): JSX.Element => {
  const { paymentMethod, dispatch } = useForm()
  return (
    <S.Wrapper>
      <MethodButton
        active={paymentMethod === 'TIBIA_COINS'}
        onClick={() =>
          dispatch({ type: 'SET_PAYMENT_METHOD', method: 'TIBIA_COINS' })
        }
        icon={<Image src={TibiaCoinsSrc} width="24" height="24" />}
      >
        Tibia Coins
      </MethodButton>
      <MethodButton
        active={paymentMethod === 'PIX'}
        onClick={() => dispatch({ type: 'SET_PAYMENT_METHOD', method: 'PIX' })}
        icon={<Image src={PixSrc} width="24" height="24" />}
      >
        Pix
      </MethodButton>
    </S.Wrapper>
  )
}

export default PaymentMethods
