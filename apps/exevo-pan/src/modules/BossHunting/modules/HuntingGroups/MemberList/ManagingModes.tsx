/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
import { useState } from 'react'
import { Dialog, Button, Input } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { guildValidationRules } from 'Constants'
import type { GuildMember, GUILD_MEMBER_ROLE } from '@prisma/client'
import { useGuildData } from '../contexts/useGuildData'

/* @ ToDo: i18n */
/* @ ToDo: testar todas as interaçoes */

const reloadPage = () => location.reload()

type ModeProps = {
  managedUser: GuildMember
  onClose: () => void
}

export const Role = ({ managedUser, onClose }: ModeProps) => {
  const manage = trpc.manageGuildMemberRole.useMutation({
    onSuccess: () => {
      toast.success(`${managedUser.name} was successfully updated!`)
      onClose()
      reloadPage()
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
  const { currentMember, guild } = useGuildData()
  const isSelfExcluding = currentMember?.id === managedUser.id

  const manage = trpc.excludeGuildMember.useMutation({
    onSuccess: () => {
      toast.success(`${managedUser.name} has left the party`)
      onClose()
      reloadPage()
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
  const [name, setName] = useState(managedUser.name)

  const manage = trpc.changeGuildMemberName.useMutation({
    onSuccess: () => {
      toast.success('Your name was updated successfully!')
      onClose()
      reloadPage()
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
