import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { useSession } from 'next-auth/react'
import { Shine } from 'components/Atoms'
import { ExevoPanIcon } from 'assets/svgs'
import { routes } from 'Constants'

export const ExevoProCTA = () => {
  const { common } = useTranslations()
  const { status, data } = useSession()

  const displayCTA = status !== 'loading' && !data?.user.proStatus

  if (!displayCTA) return null

  return (
    <a
      className="bg-surface text-onSurface clickable animate-fadeIn z-71 border-1 border-separator/50 text-s fixed bottom-[66px] left-[calc(100vw-12px)] flex items-center gap-2 whitespace-nowrap rounded-md border-solid py-2.5 px-3 shadow md:bottom-[76px] md:left-[calc(100vw-24px)] md:py-2"
      href={routes.EXEVOPRO}
      style={{ transform: 'translateX(-100%)' }}
    >
      <Shine animationIterationCount="infinite" width={60} />

      <ExevoPanIcon width={18} height={18} />
      <span>
        {templateMessage(common.exevoProCTA, {
          exevoPro: (
            <strong className="rare-gradient-text ml-[1px] tracking-wide">
              Exevo Pro
            </strong>
          ),
        })}
      </span>
    </a>
  )
}

export default ExevoProCTA
