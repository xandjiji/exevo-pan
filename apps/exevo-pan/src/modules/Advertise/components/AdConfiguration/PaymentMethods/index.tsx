import Image from 'next/image'
import clsx from 'clsx'
import TibiaCoinsSrc from 'assets/tibiaCoins.gif'
import PixSrc from 'assets/pix.png'
import MethodButton from './MethodButton'
import { useForm } from '../../../contexts/Form'
import styles from './styles.module.css'

const PaymentMethods = () => {
  const { paymentMethod, dispatch } = useForm()
  return (
    <div className={clsx('card overflow-hidden p-0', styles.wrapper)}>
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
    </div>
  )
}

export default PaymentMethods
