/* eslint-disable react/destructuring-assignment */
import clsx from 'clsx'
import { Menu } from 'components/Organisms'
import {
  MoreHorizontalIcon,
  TrashIcon,
  EditIcon,
  OutlineAddIcon,
} from 'assets/svgs'
import type { GuildMember } from '@prisma/client'
import { useGuildData } from '../contexts/useGuildData'

const RemoveMemberIcon = ({
  className,
  ...props
}: JSX.IntrinsicElements['svg']) => (
  <TrashIcon className={clsx(className, '!fill-red')} {...props} />
)

/* @ ToDo: i18n */

/* @ ToDo:

- change name action
- add role action
- remove user action

*/

export const ManageUser = (managedUser: GuildMember) => {
  const { isAdmin, currentMember } = useGuildData()

  const isSelfManaging = currentMember?.id === managedUser.id

  return (
    <Menu
      offset={[0, 8]}
      items={[
        ...(isSelfManaging
          ? [
              {
                label: 'Change name',
                icon: EditIcon,
              },
            ]
          : []),
        ...(isAdmin && !isSelfManaging
          ? [
              {
                label: 'Add role',
                icon: OutlineAddIcon,
              },
            ]
          : []),
        {
          label: isSelfManaging ? 'Leave group' : 'Remove member',
          icon: RemoveMemberIcon,
        },
      ]}
    >
      <MoreHorizontalIcon className="fill-onSurface h-4 w-4" />
    </Menu>
  )
}
