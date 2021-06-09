import coinsGif from '../../../assets/tibiaCoins.gif'
import { CtaProps } from './types'
import * as S from './styles'

const CtaButton = ({ ...props }: CtaProps): JSX.Element => {
  return (
    <S.Button
      href="https://www.reidoscoins.com.br/?tracking=60b8120a1ab43"
      target="_blank"
      rel="noopener external"
      {...props}
    >
      <S.Img src={coinsGif as string} alt="Tibia Coins" />
      Buy Tibia Coins
    </S.Button>
  )
}

export default CtaButton
