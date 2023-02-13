import { memo } from 'react'
import clsx from 'clsx'
import { Avatar, Tooltip } from 'components/Organisms'
import { LockIcon } from 'assets/svgs'

/* @ ToDo:

- desktop
- apply button {children}
- i18n
- guild link click page

*/

type GuildListProps = {
  list: PublicHuntingGroup[]
}

const GuildList = ({ list }: GuildListProps) => (
  <ul className="grid gap-4">
    {list.map(
      ({
        id,
        name,
        createdAt,
        description,
        private: isPrivate,
        server,
        memberCount,
        avatarId,
        avatarDegree,
      }) => (
        <li className={clsx('card grid', description ? 'gap-4' : 'gap-2')}>
          <div className="flex items-center gap-4">
            <Avatar
              alt={name}
              avatarId={avatarId}
              avatarDegree={avatarDegree}
            />

            <div className="grid gap-1.5">
              <h5 className="text-primaryHighlight text-base">{name}</h5>
              <span className="text-xs">
                {server} - {createdAt.toDateString()}
              </span>
            </div>
          </div>

          {!!description && <p className="text-s">{description}</p>}

          <p className="text-tsm flex items-center justify-end gap-1">
            {memberCount} members{' '}
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
          </p>
        </li>
      ),
    )}
  </ul>
)

export default memo(GuildList)
