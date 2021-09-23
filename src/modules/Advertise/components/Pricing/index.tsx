import Image from 'next/image'
import TibiaCoinsSrc from 'assets/tibiaCoins.gif'
import PixSrc from 'assets/pix.png'
import PaymentMethod from './PaymentMethod'
import * as S from './styles'

const Pricing = (): JSX.Element => (
  <S.Wrapper>
    <PaymentMethod
      active
      icon={
        <Image src={TibiaCoinsSrc} alt="Tibia Coins" width="24" height="24" />
      }
    >
      Tibia Coins
    </PaymentMethod>
    <PaymentMethod
      active={false}
      icon={<Image src={PixSrc} alt="Tibia Coins" width="24" height="24" />}
    >
      Pix
    </PaymentMethod>
  </S.Wrapper>
)

export default Pricing
