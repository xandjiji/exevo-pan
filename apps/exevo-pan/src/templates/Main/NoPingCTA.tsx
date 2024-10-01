import { useTranslations } from 'contexts/useTranslation'
import { loadRawSrc } from 'utils'

const noPingSrc = loadRawSrc('/assets/noping.png')

export const NoPingCTA = () => {
  const { common } = useTranslations()

  return (
    <a
      className="bg-surface clickable animate-fadeIn z-71 border-1 border-separator/50 text-s fixed bottom-3 left-3 rounded-md border-solid px-3 py-[7px] shadow md:bottom-5 md:left-[calc(100vw-173px)] md:py-1"
      href={common.NoPing.link}
      target="_blank"
      rel="noopener external nofollow noreferrer"
    >
      <img
        src={noPingSrc}
        alt={common.NoPing.text}
        style={{ filter: 'drop-shadow(0 0 2px black)', translate: '0px 1px' }}
      />
    </a>
  )
}
