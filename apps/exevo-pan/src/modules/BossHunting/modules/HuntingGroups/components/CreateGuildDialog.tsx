import { useState } from 'react'
import { Dialog } from 'components/Atoms'
import { trpc } from 'lib/trpc'
import type { GuildCreationInput } from 'server/guild/crud'

/* @ ToDo:

- avatar
- name
- server
- description (optional)
- private

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
    /* @ ToDo: random numbers */
    avatarId: 0,
    avatarDegree: 0,
  })

  return (
    <Dialog isOpen onClose={onClose}>
      ds
    </Dialog>
  )
}

export default CreateGuildDialog
