import Image from 'next/image'
import TibiaCoinsSrc from 'assets/tibiaCoins.gif'
import PixSrc from 'assets/pix.png'
import PaymentMethod from './PaymentMethod'
import { useForm } from '../../contexts/Form'
import * as S from './styles'

const Pricing = (): JSX.Element => {
  const { paymentMethod, dispatch } = useForm()
  return (
    <S.Wrapper>
      <PaymentMethod
        active={paymentMethod === 'TIBIA_COINS'}
        onClick={() =>
          dispatch({ type: 'SET_PAYMENT_METHOD', method: 'TIBIA_COINS' })
        }
        icon={
          <Image src={TibiaCoinsSrc} alt="Tibia Coins" width="24" height="24" />
        }
      >
        Tibia Coins
      </PaymentMethod>
      <PaymentMethod
        active={paymentMethod === 'PIX'}
        onClick={() => dispatch({ type: 'SET_PAYMENT_METHOD', method: 'PIX' })}
        icon={<Image src={PixSrc} alt="Tibia Coins" width="24" height="24" />}
      >
        Pix
      </PaymentMethod>
    </S.Wrapper>
  )
}

export default Pricing
