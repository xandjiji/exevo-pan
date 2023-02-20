import { useState, useCallback } from 'react'
import { Dialog, Input, Checkbox, TextArea, Button } from 'components/Atoms'
import { InfoTooltip } from 'components/Organisms'
import { trpc } from 'lib/trpc'
import type { GuildEditInput } from 'server/guild/crud'
import { useGuildData } from './contexts/useGuildData'
import { RollAvatar } from './components'

/* @ ToDo:

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
      className="grid gap-2 sm:min-w-[420px]"
    >
      <div className="mb-4 flex items-end gap-8">
        <Input
          label="Guild name"
          placeholder="New group name"
          maxLength={32}
          value={formState.name}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, name: e.target.value }))
          }
          className="grow"
        />

        <RollAvatar
          avatarId={formState.avatarId ?? 0}
          avatarDegree={formState.avatarDegree ?? 0}
          onChange={useCallback(
            (newAvatar) => setFormState((prev) => ({ ...prev, ...newAvatar })),
            [],
          )}
        />
      </div>

      <TextArea
        label="Description"
        placeholder="Add group description"
        maxLength={600}
        value={formState.description}
        className="min-h-[120px]"
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, description: e.target.value }))
        }
      />

      <TextArea
        label="Message board (only seen by members)"
        placeholder="Add a message to the board"
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
