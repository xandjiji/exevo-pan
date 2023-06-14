/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
import { useState } from 'react'
import {
  useTranslations,
  templateString,
  templateMessage,
} from 'contexts/useTranslation'
import { Dialog, Button, Input } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { useRouter } from 'next/router'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { guildValidationRules, routes } from 'Constants'
import type { GuildMember, GUILD_MEMBER_ROLE } from '@prisma/client'
import { useGuildData } from '../contexts/useGuildData'

type ModeProps = {
  managedUser: GuildMember
  onClose: () => void
}

export const Role = ({ managedUser, onClose }: ModeProps) => {
  const { common, huntingGroups } = useTranslations()
  const i18n = huntingGroups.MemberList.ManagingModes.Role

  const { setGuildData } = useGuildData()

  const manage = trpc.manageGuildMemberRole.useMutation({
    onSuccess: (updatedMember) => {
      setGuildData(({ members }) => ({
        members: members.map((guildMember) =>
          guildMember.id === updatedMember.id
            ? { ...guildMember, role: updatedMember.role }
            : guildMember,
        ),
      }))

      toast.success(
        templateString(i18n.successToast, { name: managedUser.name }),
      )
      onClose()
    },
    onError: () => toast.error(common.genericError),
  })

  const roleOptions: TypedOption<GUILD_MEMBER_ROLE>[] = [
    { name: i18n.options.moderator, value: 'MODERATOR' },
    { name: i18n.options.member, value: 'USER' },
  ]

  const [selectedRole, setSelectedRole] = useState(managedUser.role)

  return (
    <Dialog heading={i18n.heading} isOpen onClose={onClose}>
      <Select
        label={managedUser.name}
        options={roleOptions}
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value as GUILD_MEMBER_ROLE)}
      />

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button pill hollow onClick={onClose}>
          {i18n.cancel}
        </Button>
        <Button
          pill
          onClick={() =>
            manage.mutate({
              managedGuildMemberId: managedUser.id,
              role: selectedRole,
            })
          }
          loading={manage.isLoading}
          disabled={manage.isLoading || managedUser.role === selectedRole}
        >
          {i18n.confirm}
        </Button>
      </div>
    </Dialog>
  )
}

export const Exclusion = ({ managedUser, onClose }: ModeProps) => {
  const { common, huntingGroups } = useTranslations()
  const i18n = huntingGroups.MemberList.ManagingModes.Exclusion

  const { currentMember, guild, members, setGuildData } = useGuildData()
  const isSelfExcluding = currentMember?.id === managedUser.id

  const router = useRouter()

  const manage = trpc.excludeGuildMember.useMutation({
    onSuccess: (removedMember) => {
      const willDisband = members.length === 1

      if (willDisband) {
        toast.success(`${managedUser.name} has left the party`)
        toast.success(i18n.groupDisbanded)
        router.push(routes.BOSSES.HUNTING_GROUPS)
        onClose()
        return
      }

      const adminWillChange = removedMember.role === 'ADMIN'
      const newMemberList = members.filter(({ id }) => id !== removedMember.id)
      const [newAdmin] = newMemberList

      setGuildData({
        members: adminWillChange
          ? newMemberList.map((member) =>
              member.id === newAdmin.id
                ? { ...member, role: removedMember.role }
                : member,
            )
          : newMemberList,
      })

      toast.success(`${managedUser.name} has left the party`)
      if (adminWillChange) {
        toast.success(templateString(i18n.newAdmin, { name: newAdmin.name }))
      }
      onClose()
    },
    onError: () => toast.error(common.genericError),
  })

  return (
    <Dialog
      heading={isSelfExcluding ? i18n.heading.leave : i18n.heading.kick}
      isOpen
      onClose={onClose}
    >
      <h4 className="child:font-bold my-8 text-base font-light">
        {isSelfExcluding
          ? templateMessage(i18n.confirmMessage.leave, {
              name: <strong>{guild.name}</strong>,
            })
          : templateMessage(i18n.confirmMessage.kick, {
              name: <strong>{managedUser.name}</strong>,
            })}
      </h4>

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button pill hollow onClick={onClose}>
          {i18n.cancel}
        </Button>
        <Button
          pill
          onClick={() =>
            manage.mutate({ excludedGuildMemberId: managedUser.id })
          }
          loading={manage.isLoading}
          disabled={manage.isLoading}
          className="bg-red"
        >
          {isSelfExcluding ? i18n.leave : i18n.kick}
        </Button>
      </div>
    </Dialog>
  )
}

export const ChangeName = ({ managedUser, onClose }: ModeProps) => {
  const { common, huntingGroups } = useTranslations()
  const i18n = huntingGroups.MemberList.ManagingModes.ChangeName

  const { setGuildData } = useGuildData()

  const [name, setName] = useState(managedUser.name)

  const manage = trpc.changeGuildMemberName.useMutation({
    onSuccess: (updatedMember) => {
      setGuildData((prev) => ({
        members: prev.members.map((member) =>
          member.id === updatedMember.id
            ? { ...member, name: updatedMember.name }
            : member,
        ),
      }))

      toast.success(i18n.successToast)
      onClose()
    },
    onError: () => toast.error(common.genericError),
  })

  const isInvalid =
    name.length < guildValidationRules.name.MIN ||
    name.length > guildValidationRules.name.MAX

  const noChange = name === managedUser.name

  const submit = () => {
    if (isInvalid || manage.isLoading || noChange) return

    manage.mutate({ guildMemberId: managedUser.id, name })
  }

  return (
    <Dialog heading={i18n.heading} isOpen onClose={onClose}>
      <Input
        label={i18n.nameInput}
        placeholder={managedUser.name}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') submit()
        }}
        maxLength={guildValidationRules.name.MAX}
        error={
          isInvalid
            ? templateString(i18n.nameError, {
                min: guildValidationRules.name.MIN,
                max: guildValidationRules.name.MAX,
              })
            : undefined
        }
        enterKeyHint="send"
      />

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button pill hollow onClick={onClose}>
          {i18n.cancel}
        </Button>
        <Button
          pill
          onClick={submit}
          loading={manage.isLoading}
          disabled={manage.isLoading || isInvalid || noChange}
        >
          {i18n.confirm}
        </Button>
      </div>
    </Dialog>
  )
}
