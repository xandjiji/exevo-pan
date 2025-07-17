/* eslint-disable react/destructuring-assignment */
import { useCallback, useState } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { Menu, useMenuItems } from 'components/Organisms'
import {
  EditIcon,
  MoreHorizontalIcon,
  OutlineAddIcon,
  TrashIcon,
} from 'assets/svgs'
import type { GuildMember } from 'db/prisma/generated/client'
import { can } from 'server/guild/permissions'
import { useGuildData } from '../contexts/useGuildData'
import * as ManagingMode from './ManagingModes'

const RemoveMemberIcon = ({
  className,
  ...props
}: JSX.IntrinsicElements['svg']) => (
  <TrashIcon className={clsx(className, '!fill-red')} {...props} />
)

export const ManageUser = (managedUser: GuildMember) => {
  const { huntingGroups } = useTranslations()
  const i18n = huntingGroups.MemberList.ManageUser

  const [managingMode, setManagingMode] = useState<
    'ROLE' | 'EXCLUSION' | 'CHANGE_NAME'
  >()
  const resetManagingMode = useCallback(() => setManagingMode(undefined), [])

  const { currentMember, EXEVO_PAN_ADMIN } = useGuildData()

  const isSelfManaging = currentMember?.id === managedUser.id
  const canManageRoles = can[currentMember?.role ?? 'USER'].manageRoles
  const canExclude = can[currentMember?.role ?? 'USER'].exclude(
    managedUser.role,
  )

  const menuItems = useMenuItems([
    (isSelfManaging || EXEVO_PAN_ADMIN) && {
      label: i18n.changeName,
      icon: EditIcon,
      onSelect: () => setManagingMode('CHANGE_NAME'),
    },
    ((canManageRoles && !isSelfManaging) ||
      (EXEVO_PAN_ADMIN && managedUser.role !== 'ADMIN')) && {
      label: i18n.addRole,
      icon: OutlineAddIcon,
      onSelect: () => setManagingMode('ROLE'),
    },
    (canExclude || isSelfManaging || EXEVO_PAN_ADMIN) && {
      label: isSelfManaging ? i18n.leaveGroup : i18n.kickMember,
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
