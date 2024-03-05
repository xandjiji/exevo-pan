import Image from 'next/image'
import clsx from 'clsx'
import { OptionButton } from 'components/Atoms'
import TibiaCoinsSrc from 'assets/tibiaCoins.gif'
import PixSrc from 'assets/pix.png'
import { useForm } from '../../../contexts/Form'
import styles from './styles.module.css'

const PaymentMethods = () => {
  const { paymentMethod, dispatch } = useForm()
  return (
    <div className={clsx('card overflow-hidden p-0', styles.wrapper)}>
      <OptionButton
        active={paymentMethod === 'TIBIA_COINS'}
        aria-label="Tibia Coins"
        onClick={() =>
          dispatch({ type: 'SET_PAYMENT_METHOD', method: 'TIBIA_COINS' })
        }
        icon={
          <Image
            alt="Tibia Coin"
            src={TibiaCoinsSrc}
            width="24"
            height="24"
            className="pixelated"
          />
        }
      >
        Tibia Coins
      </OptionButton>
      <OptionButton
        active={paymentMethod === 'PIX'}
        aria-label="Pix"
        onClick={() => dispatch({ type: 'SET_PAYMENT_METHOD', method: 'PIX' })}
        icon={
          <Image
            alt="Pix"
            src={PixSrc}
            width="24"
            height="24"
            className="pixelated"
          />
        }
      >
        Pix
      </OptionButton>
    </div>
  )
}

export default PaymentMethods
