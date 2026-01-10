/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { Button } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { Avatar, Tooltip } from 'components/Organisms'
import { getGuildPermalink } from 'utils'
import { LockIcon } from 'assets/svgs'
import { useLocalizedHref } from 'hooks/useLocalizedHref'

type GuildListProps = {
  list: PublicHuntingGroup[]
  onApply?: (huntingGroup: PublicHuntingGroup) => void
}

function Link({ guildName }: { guildName: string }) {
  return (
    <a
      className="text-primaryHighlight text-base font-bold"
      href={useLocalizedHref(getGuildPermalink(guildName))}
    >
      {guildName}
    </a>
  )
}

const GuildList = ({ list, onApply }: GuildListProps) => {
  const { huntingGroups } = useTranslations()
  const i18n = huntingGroups.GuildGrid.GuildList

  return list.length > 0 ? (
    <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {list.map((guild) => {
        const {
          id,
          name,
          description,
          private: isPrivate,
          server,
          memberCount,
          avatarId,
          avatarDegree,
        } = guild

        return (
          <li
            key={id}
            className={clsx(
              'card flex flex-col overflow-hidden',
              description ? 'gap-4' : 'gap-2',
            )}
          >
            <div className="flex items-center gap-4">
              <Avatar
                alt={name}
                avatarId={avatarId}
                avatarDegree={avatarDegree}
              />

              <div className="grid gap-1.5">
                <Link guildName={name} />
                <span className="text-tsm flex items-center gap-1">
                  {server} - {memberCount}{' '}
                  {memberCount > 1 ? i18n.members : i18n.member}{' '}
                  {isPrivate && (
                    <div className="h-3 w-3">
                      <Tooltip
                        content={<span>{i18n.privateTooltip}</span>}
                        offset={[0, 8]}
                      >
                        <LockIcon className="fill-onSurface h-3 w-3" />
                      </Tooltip>
                    </div>
                  )}
                </span>
              </div>
            </div>

            {!!description && (
              <p className="text-s line-clamp-2 whitespace-pre-wrap">
                {description}
              </p>
            )}

            {!!onApply && (
              <Button
                pill
                className="ml-auto mt-auto"
                onClick={() => onApply(guild)}
              >
                {i18n.apply}
              </Button>
            )}
          </li>
        )
      })}
    </ul>
  ) : (
    <div>
      <EmptyState
        variant="large"
        text={i18n.emptyState}
        className="mx-auto mt-8"
      />
    </div>
  )
}

export default memo(GuildList)
