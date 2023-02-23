/* eslint-disable react/destructuring-assignment */
import { useState } from 'react'
import { Dialog, Button } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import type { GuildMember, GUILD_MEMBER_ROLE } from '@prisma/client'

/* @ ToDo: i18n */
/* @ ToDo: testar todas as interaçoes */

type ModeProps = {
  managedUser: GuildMember
  onClose: () => void
}

export const Role = ({ managedUser, onClose }: ModeProps) => {
  const manage = trpc.manageGuildMemberRole.useMutation({
    onSuccess: () => {
      /* @ ToDo: update page props */
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
          Submit
        </Button>
      </div>
    </Dialog>
  )
}
