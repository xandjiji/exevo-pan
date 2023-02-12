import { useState } from 'react'
import clsx from 'clsx'
import { Dialog, Button, Input, TextArea } from 'components/Atoms'
import { Avatar, Select } from 'components/Organisms'
import { trpc } from 'lib/trpc'
import { avatar } from 'utils'
import { DiceIcon } from 'assets/svgs'
import { avatar as AVATAR } from 'Constants'
import type { GuildCreationInput } from 'server/guild/crud'
import styles from './styles.module.css'

/* @ ToDo:
- error states

- i18n

*/

type CreateGuildDialogProps = {
  serverOptions: Option[]
  onClose: () => void
}

const CreateGuildDialog = ({
  serverOptions,
  onClose,
}: CreateGuildDialogProps) => {
  const [formState, setFormState] = useState<GuildCreationInput>({
    name: '',
    server: 'Antica',
    private: false,
    description: '',
    avatarId: avatar.getRandom.id(),
    avatarDegree: avatar.getRandom.degree(),
  })

  return (
    <Dialog isOpen onClose={onClose} heading="Create new hunting group">
      {/*       <div className="custom-scrollbar flex max-h-[80vh] max-w-5xl flex-wrap items-center gap-6 overflow-auto">
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

      <div className="flex flex-col gap-8">
        <div className="flex items-end gap-8">
          <Input
            label="Group name"
            value={formState.name}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Choose a group name"
            className="grow"
          />

          <button
            type="button"
            className="group relative cursor-pointer transition-opacity"
            onClick={() =>
              setFormState((prev) => ({
                ...prev,
                avatarId: avatar.getRandom.id(),
                avatarDegree: avatar.getRandom.degree(),
              }))
            }
          >
            <Avatar
              alt={formState.name}
              avatarId={formState.avatarId}
              avatarDegree={formState.avatarDegree}
              className="group-hover:opacity-30"
            />

            <span className="text-onSurface absolute-centered font-bold opacity-0 transition-opacity group-hover:opacity-100">
              <DiceIcon className="fill-onSurface" />
              Roll
            </span>
          </button>
        </div>

        <Select
          label="Server"
          options={serverOptions}
          value={formState.server}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, server: e.target.value }))
          }
        />
      </div>
    </Dialog>
  )
}

export default CreateGuildDialog
