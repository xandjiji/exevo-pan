import { useTranslations } from 'contexts/useTranslation'
import Link from 'next/link'
import { loadRawSrc } from 'utils'
import { links } from 'Constants'

const ravenSrc = loadRawSrc('/assets/ravendawn-ico.png')
const tcSrc = loadRawSrc('/assets/tibiaCoins.gif')
const tbjSrc = loadRawSrc('/assets/tibiablackjack-24x24.png')

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
          <img src={tbjSrc} alt="Tibia Blackjack" width={24} height={24} />
          <span style={{ filter: 'drop-shadow(0 0 1px black)' }}>
            {common.TibiaBlackjackCta.text}
          </span>
        </Link>
      </li>

      <li className="h-8">
        <Link
          className="flex h-full w-full items-center justify-center gap-2 bg-[#493d6e] px-2 font-bold text-[#f7c300]"
          target="_blank"
          rel="noopener external nofollow"
          href={common.TibiaCoinsCta.link}
        >
          <img src={tcSrc} alt="Tibia Coins" width={24} height={24} />
          <span style={{ filter: 'drop-shadow(0 0 1px black)' }}>
            {common.TibiaCoinsCta.text}
          </span>
        </Link>
      </li>

      <li className="col-span-full h-8">
        <Link
          className="bg-darkerPrimary flex h-full w-full items-center justify-center gap-2 px-2 font-bold text-[#fbc321]"
          target="_blank"
          rel="noopener external nofollow"
          href={common.Ravendawn.link}
        >
          <img
            src={ravenSrc}
            alt="Ravendawn"
            width={16}
            height={16}
            style={{ filter: 'drop-shadow(0 0 1px black)' }}
          />
          <span style={{ filter: 'drop-shadow(0 0 1px black)' }}>
            {common.Ravendawn.text}
          </span>
        </Link>
      </li>
    </ul>
  )
}

export default MobileTopCTA
