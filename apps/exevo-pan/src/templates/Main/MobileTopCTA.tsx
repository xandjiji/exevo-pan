import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import Link from 'next/link'
import { links } from 'Constants'
import tbjSrc from 'assets/tibiablackjack-24x24.png'
import tcSrc from 'assets/tibiaCoins.gif'
import ravenSrc from 'assets/ravendawn-ico.png'

const MobileTopCTA = () => {
  const { common } = useTranslations()

  return (
    <ul className="grid grid-cols-2 text-center text-xs tracking-widest md:hidden">
      <li className="h-8">
        <Link
          className="flex h-full w-full items-center justify-center gap-2 bg-[#333333] px-2 font-bold text-[#70d967]"
          target="_blank"
          rel="noopener external nofollow"
          href={links.TIBIA_BLACKJACK}
        >
          <Image src={tbjSrc} alt="Tibia Blackjack" width={24} height={24} />
          {common.TibiaBlackjackCta.text}
        </Link>
      </li>

      <li className="h-8">
        <Link
          className="flex h-full w-full items-center justify-center gap-2 bg-[#493d6e] px-2 font-bold text-[#f7c300]"
          target="_blank"
          rel="noopener external nofollow"
          href={common.TibiaCoinsCta.link}
        >
          <Image src={tcSrc} alt="Tibia Coins" width={24} height={24} />
          {common.TibiaCoinsCta.text}
        </Link>
      </li>

      <li className="col-span-full h-8">
        <Link
          className="bg-darkerPrimary flex h-full w-full items-center justify-center gap-2 px-2 font-bold text-[#fbc321]"
          target="_blank"
          rel="noopener external nofollow"
          href={common.TibiaCoinsCta.link}
        >
          <Image src={ravenSrc} alt="Ravendawn" width={16} height={16} />
          {common.Ravendawn.text}
        </Link>
      </li>
    </ul>
  )
}

export default MobileTopCTA
