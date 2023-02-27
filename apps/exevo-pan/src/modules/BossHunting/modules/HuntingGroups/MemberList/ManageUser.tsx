/* eslint-disable react/destructuring-assignment */
import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { Menu, useMenuItems } from 'components/Organisms'
import {
  MoreHorizontalIcon,
  TrashIcon,
  EditIcon,
  OutlineAddIcon,
} from 'assets/svgs'
import type { GuildMember } from '@prisma/client'
import { can } from 'server/guild/permissions'
import { useGuildData } from '../contexts/useGuildData'
import * as ManagingMode from './ManagingModes'

const RemoveMemberIcon = ({
  className,
  ...props
}: JSX.IntrinsicElements['svg']) => (
  <TrashIcon className={clsx(className, '!fill-red')} {...props} />
)

/* @ ToDo: i18n */

export const ManageUser = (managedUser: GuildMember) => {
  const [managingMode, setManagingMode] = useState<
    'ROLE' | 'EXCLUSION' | 'CHANGE_NAME'
  >()
  const resetManagingMode = useCallback(() => setManagingMode(undefined), [])

  const { isAdmin, currentMember } = useGuildData()

  const isSelfManaging = currentMember?.id === managedUser.id
  const canExclude = can[currentMember?.role ?? 'USER'].exclude(
    managedUser.role,
  )

  const menuItems = useMenuItems([
    isSelfManaging && {
      label: 'Change name',
      icon: EditIcon,
      onSelect: () => setManagingMode('CHANGE_NAME'),
    },
    isAdmin &&
      !isSelfManaging && {
        label: 'Add role',
        icon: OutlineAddIcon,
        onSelect: () => setManagingMode('ROLE'),
      },
    (canExclude || isSelfManaging) && {
      label: isSelfManaging ? 'Leave group' : 'Kick member',
      icon: RemoveMemberIcon,
      onSelect: () => setManagingMode('EXCLUSION'),
    },
  ])

  if (menuItems.length === 0) return null

  return (
    <>
      <Menu offset={[0, 8]} items={menuItems}>
        <MoreHorizontalIcon className="fill-onSurface h-4 w-4" />
      </Menu>

      {managingMode === 'ROLE' && (
        <ManagingMode.Role
          managedUser={managedUser}
          onClose={resetManagingMode}
        />
      )}

      {managingMode === 'EXCLUSION' && (
        <ManagingMode.Exclusion
          managedUser={managedUser}
          onClose={resetManagingMode}
        />
      )}

      {managingMode === 'CHANGE_NAME' && (
        <ManagingMode.ChangeName
          managedUser={managedUser}
          onClose={resetManagingMode}
        />
      )}
    </>
  )
}
