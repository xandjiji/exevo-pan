import { useTranslations } from 'contexts/useTranslation'
import { loadRawSrc } from 'utils'
import { links } from 'Constants'

const ravenSrc = loadRawSrc('/assets/ravendawn-ico.png')
const tcSrc = loadRawSrc('/assets/tibiaCoins.gif')
const tbjSrc = loadRawSrc('/assets/tibiablackjack-24x24.png')
// const noPingSrc = loadRawSrc('/assets/noping-mini.png')

const MobileTopCTA = () => {
  const { common } = useTranslations()

  return (
    <ul className="grid grid-cols-2 text-center text-xs tracking-widest md:hidden">
      <li className="h-8">
        <a
          className="flex h-full w-full items-center justify-center gap-2 bg-[#333333] px-2 font-bold text-[#70d967]"
          target="_blank"
          rel="noopener external nofollow noreferrer"
          href={links.TIBIA_BLACKJACK}
        >
          <img src={tbjSrc} alt="Tibia Blackjack" width={24} height={24} />
          <span style={{ filter: 'drop-shadow(0 0 1px black)' }}>
            {common.TibiaBlackjackCta.text}
          </span>
        </a>
      </li>

      <li className="h-8">
        <a
          className="flex h-full w-full items-center justify-center gap-2 bg-[#493d6e] px-2 font-bold text-[#f7c300]"
          target="_blank"
          rel="noopener external nofollow noreferrer"
          href={common.TibiaCoinsCta.link}
        >
          <img src={tcSrc} alt="Tibia Coins" width={24} height={24} />
          <span style={{ filter: 'drop-shadow(0 0 1px black)' }}>
            {common.TibiaCoinsCta.text}
          </span>
        </a>
      </li>
    </ul>
  )
}

export default MobileTopCTA

// <li className="h-8">
//   <a
//     className="flex h-full w-full items-center justify-center gap-2 bg-[#222222] px-2 font-bold text-[#70d967]"
//     target="_blank"
//     rel="noopener external nofollow noreferrer"
//     href={common.NoPing.link}
//   >
//     <img src={noPingSrc} alt="NoPing" width={16} height={16} />
//     <span>{common.NoPing.text}</span>
//   </a>
// </li>
