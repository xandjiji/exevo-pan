/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
import { useState } from 'react'
import { Dialog, Button, Input } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { useRouter } from 'next/router'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { guildValidationRules, routes } from 'Constants'
import type { GuildMember, GUILD_MEMBER_ROLE } from '@prisma/client'
import { useGuildData } from '../contexts/useGuildData'

/* @ ToDo: i18n */
/* @ ToDo: testar todas as interaçoes */

type ModeProps = {
  managedUser: GuildMember
  onClose: () => void
}

export const Role = ({ managedUser, onClose }: ModeProps) => {
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

      toast.success(`${managedUser.name} was successfully updated!`)
      onClose()
    },
    onError: () => {
      toast.error('Oops! Something went wrong')
    },
  })

  const roleOptions: TypedOption<GUILD_MEMBER_ROLE>[] = [
    { name: 'Moderator', value: 'MODERATOR' },
    { name: 'Member', value: 'USER' },
  ]

  const [selectedRole, setSelectedRole] = useState(managedUser.role)

  return (
    <Dialog heading="Change member role" isOpen onClose={onClose}>
      <Select
        label={managedUser.name}
        options={roleOptions}
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value as GUILD_MEMBER_ROLE)}
      />

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button pill hollow onClick={onClose}>
          Cancel
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
          Confirm
        </Button>
      </div>
    </Dialog>
  )
}

export const Exclusion = ({ managedUser, onClose }: ModeProps) => {
  const { currentMember, guild, members, setGuildData } = useGuildData()
  const isSelfExcluding = currentMember?.id === managedUser.id

  const router = useRouter()

  const manage = trpc.excludeGuildMember.useMutation({
    onSuccess: (removedMember) => {
      const willDisband = members.length === 1

      if (willDisband) {
        toast.success(`${managedUser.name} has left the party`)
        toast.success('Hunting group was disbanded')
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
        toast.success(`${newAdmin.name} is the new group admin`)
      }
      onClose()
    },
    onError: () => {
      toast.error('Oops! Something went wrong')
    },
  })

  return (
    <Dialog
      heading={
        isSelfExcluding ? 'Leave hunting group' : 'Kick hunting group member'
      }
      isOpen
      onClose={onClose}
    >
      <h4 className="child:font-bold my-8 text-base font-light">
        {isSelfExcluding ? (
          <>
            Are you sure you want to leave <strong>{guild.name}</strong>?
          </>
        ) : (
          <>
            Are you sure you want to kick <strong>{managedUser.name}</strong>?
          </>
        )}
      </h4>

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button pill hollow onClick={onClose}>
          Cancel
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
          {isSelfExcluding ? 'Leave' : 'Kick'}
        </Button>
      </div>
    </Dialog>
  )
}

export const ChangeName = ({ managedUser, onClose }: ModeProps) => {
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

      toast.success('Your name was updated successfully!')
      onClose()
    },
    onError: () => {
      toast.error('Oops! Something went wrong')
    },
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
    <Dialog heading="Change your name" isOpen onClose={onClose}>
      <Input
        label="New name"
        placeholder={managedUser.name}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') submit()
        }}
        maxLength={guildValidationRules.name.MAX}
        error={
          isInvalid
            ? `Name length must be between ${guildValidationRules.name.MIN}-${guildValidationRules.name.MAX} characters`
            : undefined
        }
        enterKeyHint="send"
      />

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button pill hollow onClick={onClose}>
          Cancel
        </Button>
        <Button
          pill
          onClick={submit}
          loading={manage.isLoading}
          disabled={manage.isLoading || isInvalid || noChange}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  )
}
