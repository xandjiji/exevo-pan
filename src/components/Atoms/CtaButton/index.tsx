import Image from 'next/image'
import coinsGif from 'assets/tibiaCoins.gif'
import * as S from './styles'

const CtaButton = ({
  ...props
}: React.HTMLAttributes<HTMLAnchorElement>): JSX.Element => (
  <S.Button
    href="https://www.reidoscoins.com.br/?tracking=60b8120a1ab43"
    target="_blank"
    rel="noopener external"
    {...props}
  >
    <S.ImgWrapper>
      <Image src={coinsGif} priority alt="Tibia Coins" width="24" height="24" />
    </S.ImgWrapper>
    Buy Tibia Coins
  </S.Button>
)

export default CtaButton
