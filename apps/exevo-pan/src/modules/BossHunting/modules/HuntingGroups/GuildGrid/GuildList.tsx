import { memo } from 'react'
import clsx from 'clsx'
import NextLink from 'next/link'
import { Button } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { Avatar, Tooltip } from 'components/Organisms'
import { getGuildPermalink } from 'utils'
import { LockIcon } from 'assets/svgs'

/* @ ToDo:

- guild link click page
- i18n (nao esquecer do empty state)

*/

type GuildListProps = {
  list: PublicHuntingGroup[]
  onApply?: (huntingGroup: PublicHuntingGroup) => void
}

const GuildList = ({ list, onApply }: GuildListProps) =>
  list.length > 0 ? (
    <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {list.map((guild) => {
        const {
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
            className={clsx(
              'card flex flex-col',
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
                <NextLink
                  className="text-primaryHighlight text-base font-bold"
                  href={getGuildPermalink(name)}
                >
                  {name}
                </NextLink>
                <span className="text-tsm flex items-center gap-1">
                  {server} - {memberCount} members{' '}
                  {isPrivate && (
                    <div className="h-3 w-3">
                      <Tooltip
                        content={<span>This is a private hunting group</span>}
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
                Apply
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
        text="No hunting groups"
        className="mx-auto mt-8"
      />
    </div>
  )

export default memo(GuildList)
