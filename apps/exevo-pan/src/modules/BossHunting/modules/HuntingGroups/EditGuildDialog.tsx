import { useState } from 'react'
import { Dialog, TextArea, Button } from 'components/Atoms'
import { trpc } from 'lib/trpc'
import { EditIcon } from 'assets/svgs'
import type { GuildEditInput } from 'server/guild/crud'
import { useGuildData } from './contexts/useGuildData'

/* @ ToDo:

- add/edit description dialog
    - submit action
    - after submit
    - caracteres especiais, etc?

- i18n

*/

type EditGuildDialogProps = {
  onClose: () => void
}

const EditGuildDialog = ({ onClose }: EditGuildDialogProps) => {
  const { guild } = useGuildData()

  const [formState, setFormState] = useState<GuildEditInput>({
    guildId: guild.id,
    name: guild.name ?? undefined,
    private: guild.private ?? undefined,
    description: guild.description ?? undefined,
    messageBoard: guild.messageBoard ?? undefined,
    avatarId: guild.avatarId,
    avatarDegree: guild.avatarDegree,
  })

  return (
    <Dialog heading="Edit hunting group" isOpen onClose={onClose}>
      <TextArea
        label="New description"
        value={formState.description}
        className="min-h-[120px]"
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, description: e.target.value }))
        }
        maxLength={600}
      />

      <div className="mt-4 flex items-center justify-end gap-4">
        <Button pill hollow onClick={onClose}>
          Cancel
        </Button>
        <Button pill>Save</Button>
      </div>
    </Dialog>
  )
}

export default EditGuildDialog
