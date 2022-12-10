import { useState, useMemo } from 'react'
import type { BuiltInProviderType } from 'next-auth/providers'
import { useTranslations } from 'contexts/useTranslation'
import { FadeImage } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import { PersonIcon, GoogleIcon, DiscordIcon } from 'assets/svgs'
import { dateToDateObject } from 'utils'
import { UserCardProps } from './types'

const providerIcons: Partial<
  Record<
    BuiltInProviderType,
    (args: JSX.IntrinsicElements['svg']) => JSX.Element
  >
> = {
  google: GoogleIcon,
  discord: DiscordIcon,
}

const UserCard = ({ user }: UserCardProps) => {
  const {
    translations: { common, dashboard },
  } = useTranslations()

  const [fallbackAvatar, setFallbackAvatar] = useState(false)

  const { name, picture, provider, proStatus, proSince } = user

  const readableProSince: string = useMemo(() => {
    if (!proSince) return ''

    const { month, year } = dateToDateObject(new Date(proSince))

    return `${common.FullMonth[month]} ${year}`
  }, [common, proSince])

  const ProviderIcon = providerIcons[provider]

  return (
    <div className="flex items-center gap-4">
      {fallbackAvatar ? (
        <PersonIcon
          width={64}
          height={64}
          className="bg-surface fill-onSurface rounded shadow"
        />
      ) : (
        <FadeImage
          src={picture}
          alt={name}
          width={64}
          height={64}
          unoptimized
          className="bg-surface rounded shadow"
          onError={() => setFallbackAvatar(true)}
        />
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <strong>{name}</strong>
          {ProviderIcon && (
            <div className="card grid place-content-center rounded p-1 shadow-sm">
              <ProviderIcon className="fill-onSurface h-3 w-3 transition-colors" />
            </div>
          )}
        </div>

        <span className="text-tsm font-light">
          Status:{' '}
          {proStatus ? (
            <Tooltip
              content={
                <>
                  {dashboard.UserCard.proSince}: {readableProSince}
                </>
              }
              offset={[0, 6]}
            >
              <strong className="text-rare tracking-wide">Exevo Pro</strong>
            </Tooltip>
          ) : (
            <strong className="tracking-wide">
              {dashboard.UserCard.freeStatus}
            </strong>
          )}
        </span>
      </div>
    </div>
  )
}

export default UserCard
