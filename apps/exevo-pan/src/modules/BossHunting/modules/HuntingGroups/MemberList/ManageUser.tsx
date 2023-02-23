/* eslint-disable react/destructuring-assignment */
import { useState, useCallback, memo } from 'react'
import clsx from 'clsx'
import { Menu, useMenuItems } from 'components/Organisms'
import {
  MoreHorizontalIcon,
  TrashIcon,
  EditIcon,
  OutlineAddIcon,
} from 'assets/svgs'
import type { GuildMember } from '@prisma/client'
import { useGuildData } from '../contexts/useGuildData'
import * as ManagingMode from './ManagingModes'

const RemoveMemberIcon = ({
  className,
  ...props
}: JSX.IntrinsicElements['svg']) => (
  <TrashIcon className={clsx(className, '!fill-red')} {...props} />
)

/* @ ToDo: i18n */

/* @ ToDo:

- kick/leave user action
- change name action

*/

export const ManageUser = (managedUser: GuildMember) => {
  const [managingMode, setManagingMode] = useState<'ROLE'>()
  const resetManagingMode = useCallback(() => setManagingMode(undefined), [])

  const { isAdmin, currentMember } = useGuildData()

  const isSelfManaging = currentMember?.id === managedUser.id

  return (
    <>
      <Menu
        offset={[0, 8]}
        items={useMenuItems([
          isSelfManaging && {
            label: 'Change name',
            icon: EditIcon,
          },
          isAdmin &&
            !isSelfManaging && {
              label: 'Add role',
              icon: OutlineAddIcon,
              onSelect: () => setManagingMode('ROLE'),
            },
          {
            label: isSelfManaging ? 'Leave group' : 'Kick member',
            icon: RemoveMemberIcon,
          },
        ])}
      >
        <MoreHorizontalIcon className="fill-onSurface h-4 w-4" />
      </Menu>

      {managingMode === 'ROLE' && (
        <ManagingMode.Role
          managedUser={managedUser}
          onClose={resetManagingMode}
        />
      )}
    </>
  )
}
