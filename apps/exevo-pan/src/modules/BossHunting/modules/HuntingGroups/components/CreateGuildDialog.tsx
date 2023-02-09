import { useState } from 'react'
import { Dialog, Button } from 'components/Atoms'
import { Avatar } from 'components/Organisms'
import { trpc } from 'lib/trpc'
import { avatar } from 'utils'
import type { GuildCreationInput } from 'server/guild/crud'

/* @ ToDo:

- avatar
- name
- server
- description (optional)

*/

type CreateGuildDialogProps = {
  onClose: () => void
}

const CreateGuildDialog = ({ onClose }: CreateGuildDialogProps) => {
  const [formState, setFormState] = useState<GuildCreationInput>({
    name: '',
    server: '',
    private: false,
    description: '',
    avatarId: avatar.getRandom.id(),
    avatarDegree: avatar.getRandom.degree(),
  })

  return (
    <Dialog isOpen onClose={onClose}>
      <Avatar
        alt={formState.name}
        avatarId={formState.avatarId}
        avatarDegree={formState.avatarDegree}
      />

      <Button
        onClick={() =>
          setFormState((prev) => ({
            ...prev,
            avatarId: avatar.getRandom.id(),
            avatarDegree: avatar.getRandom.degree(),
          }))
        }
      >
        Re-roll
      </Button>
    </Dialog>
  )
}

export default CreateGuildDialog
