import { useState } from 'react'
import { Dialog } from 'components/Atoms'
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
      ds
    </Dialog>
  )
}

export default CreateGuildDialog
