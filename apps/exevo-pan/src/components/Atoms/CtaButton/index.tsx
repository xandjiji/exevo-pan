/* eslint-disable react/jsx-no-target-blank */
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import coinsGif from 'assets/tibiaCoins.gif'

const CtaButton = ({ ...props }: React.HTMLAttributes<HTMLAnchorElement>) => {
  const { common } = useTranslations()

  return (
    <a
      href={common.TibiaCoinsCta.link}
      target="_blank"
      rel="noopener external nofollow"
      className="clickable text-tsm text-onSurface md:z-1 hover:highlight-10 animated-background relative z-10 ml-2 hidden items-end whitespace-nowrap rounded-2xl py-2 pr-4 pl-10 tracking-wider shadow-md transition-all md:flex"
      {...props}
    >
      <Image
        src={coinsGif}
        alt="Tibia Coins"
        width="24"
        height="24"
        className="absolute top-1/2 left-3 h-6 w-6"
        style={{ transform: 'translateY(-50%)' }}
      />

      {common.TibiaCoinsCta.text}
    </a>
  )
}

export default CtaButton
