/* eslint-disable react/jsx-no-target-blank */
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import coinsGif from 'assets/tibiaCoins.gif'

const CtaButton = ({ ...props }: React.HTMLAttributes<HTMLAnchorElement>) => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <a
      href={common.TibiaCoinsCta.link}
      target="_blank"
      rel="noopener external nofollow"
      className="clickable text-tsm bg-primary text-onPrimary md:text-onSurface md:z-1 hover:highlight-10 md:animated-background fixed bottom-[84px] right-4 z-10 ml-2 flex items-end whitespace-nowrap rounded-2xl py-2 pr-4 pl-10 tracking-wider shadow-lg transition-all md:relative md:bottom-0 md:right-0 md:shadow-md"
      {...props}
    >
      <div
        className="absolute top-1/2 left-3 h-6 w-6"
        style={{ transform: 'translateY(-50%)' }}
      >
        <Image src={coinsGif} alt="Tibia Coins" width="24" height="24" />
      </div>

      {common.TibiaCoinsCta.text}
    </a>
  )
}

export default CtaButton
