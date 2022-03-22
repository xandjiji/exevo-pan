import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import coinsGif from 'assets/tibiaCoins.gif'
import * as S from './styles'

const CtaButton = ({
  ...props
}: React.HTMLAttributes<HTMLAnchorElement>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <S.Button
      href={common.TibiaCoinsCta.link}
      target="_blank"
      rel="noopener external nofollow"
      {...props}
    >
      <S.ImgWrapper>
        <Image src={coinsGif} alt="Tibia Coins" width="24" height="24" />
      </S.ImgWrapper>
      {common.TibiaCoinsCta.text}
    </S.Button>
  )
}

export default CtaButton
