import { useState } from 'react'
import { Dialog, Input, Checkbox, TextArea, Button } from 'components/Atoms'
import { InfoTooltip } from 'components/Organisms'
import { trpc } from 'lib/trpc'
import type { GuildEditInput } from 'server/guild/crud'
import { useGuildData } from './contexts/useGuildData'

/* @ ToDo:

avatar

- validate fields (disable submit)

- submit action
- after submit (router push formState.name) (field errors)
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
    name: guild.name,
    private: guild.private,
    description: guild.description ?? undefined,
    messageBoard: guild.messageBoard ?? undefined,
    avatarId: guild.avatarId,
    avatarDegree: guild.avatarDegree,
  })

  return (
    <Dialog
      heading="Edit hunting group"
      isOpen
      onClose={onClose}
      className="grid gap-4 sm:min-w-[420px]"
    >
      <Input
        label="Guild name"
        value={formState.name}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <TextArea
        label="Description"
        value={formState.description}
        className="min-h-[120px]"
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, description: e.target.value }))
        }
        maxLength={600}
      />

      <TextArea
        label="Message board (only seen by members)"
        value={formState.messageBoard}
        className="min-h-[120px]"
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, messageBoard: e.target.value }))
        }
        maxLength={2048}
      />

      <Checkbox
        label={
          <span className="flex items-center gap-1.5">
            Private group{' '}
            <InfoTooltip
              labelSize
              content="A private group can be found, but its members will be hidden"
            />
          </span>
        }
        aria-label="Private group"
        checked={formState.private}
        onChange={() =>
          setFormState((prev) => ({ ...prev, private: !formState.private }))
        }
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
