import { useTranslations } from 'contexts/useTranslation'
import { loadRawSrc } from 'utils'

const ravendawnSrc = loadRawSrc('/assets/ravendawn-logo-2.png')

export const RavendawnCTA = () => {
  const { common } = useTranslations()

  return (
    <a
      className="bg-surface clickable animate-fadeIn border-1 border-separator/50 text-s rounded-md border-solid px-3 py-1 shadow lg:my-1"
      href={common.Ravendawn.link}
      target="_blank"
      rel="noopener external nofollow noreferrer"
    >
      <img
        src={ravendawnSrc}
        alt="Play Ravendawn"
        style={{ filter: 'drop-shadow(0 0 1px black)', translate: '2px 0px' }}
        className="pointer-events-none -mt-4 -mb-3"
      />
    </a>
  )
}
