import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Shine } from 'components/Atoms'
import { routes } from 'Constants'

export const ExevoProCTA = () => {
  const {
    translations: { common },
  } = useTranslations()
  const { status, data } = useSession()

  const displayCTA = status !== 'loading' && !data?.user.proStatus

  if (!displayCTA) return null

  return (
    <Link
      className="bg-surface text-onSurface clickable animate-fadeIn z-71 border-1 border-separator/50 text-s fixed bottom-3 left-[calc(100vw-12px)] whitespace-nowrap rounded-md border-solid px-3 py-2 shadow md:bottom-6 md:left-[calc(100vw-24px)]"
      href={routes.EXEVOPRO}
      style={{ transform: 'translateX(-100%)' }}
    >
      <Shine animationIterationCount="infinite" width={60} />
      {templateMessage(common.exevoProCTA, {
        exevoPro: (
          <strong className="from-primaryHighlight to-rare ml-[1px] bg-gradient-to-r bg-clip-text tracking-wide text-transparent">
            Exevo Pro
          </strong>
        ),
      })}
    </Link>
  )
}

export default ExevoProCTA
