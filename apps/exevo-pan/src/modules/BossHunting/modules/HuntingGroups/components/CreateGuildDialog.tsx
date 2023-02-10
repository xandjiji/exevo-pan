import { useState } from 'react'
import clsx from 'clsx'
import { Dialog, Button, Input } from 'components/Atoms'
import { Avatar } from 'components/Organisms'
import { trpc } from 'lib/trpc'
import { avatar } from 'utils'
import { DiceIcon } from 'assets/svgs'
import { avatar as AVATAR } from 'Constants'
import type { GuildCreationInput } from 'server/guild/crud'
import styles from './styles.module.css'

/* @ ToDo:

- avatar
- name
- server
- description (optional)

- error states

- i18n

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
    <Dialog isOpen onClose={onClose} heading="Create new hunting group">
      {/* <div className="custom-scrollbar flex max-h-[80vh] max-w-5xl flex-wrap items-center gap-6 overflow-auto">
        {Array.from({ length: AVATAR.id.max + 1 }, (_, index) => (
          <div>
            [{index}]
            <Avatar
              alt={formState.name}
              avatarId={index}
              avatarDegree={formState.avatarDegree}
            />
          </div>
        ))}
      </div> */}

      <div className="flex gap-4">
        <Input
          label="Group name"
          className={clsx(
            'relative flex h-14 grow flex-col justify-between',
            styles.nameInput,
          )}
        />

        <div className="flex w-fit flex-col items-center gap-2">
          <Avatar
            alt={formState.name}
            avatarId={formState.avatarId}
            avatarDegree={formState.avatarDegree}
            className="grid !h-14 !w-full place-items-center transition-all"
          />
          <Button
            onClick={() =>
              setFormState((prev) => ({
                ...prev,
                avatarId: avatar.getRandom.id(),
                avatarDegree: avatar.getRandom.degree(),
              }))
            }
            pill
            className="text-xs"
          >
            <DiceIcon className="fill-onPrimary h-4 w-4 shrink-0" />
            Roll
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default CreateGuildDialog
