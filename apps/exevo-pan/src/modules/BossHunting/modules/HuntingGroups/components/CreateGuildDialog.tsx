import { useState } from 'react'
import { Dialog, Button, Input, Alert } from 'components/Atoms'
import { Avatar, Select } from 'components/Organisms'
import { useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { trpc } from 'lib/trpc'
import { avatar } from 'utils'
import { DiceIcon } from 'assets/svgs'
import { routes } from 'Constants'
import type { GuildCreationInput } from 'server/guild/crud'

/* @ ToDo:

- request
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
  const { status } = useSession()
  const notAuthed = status !== 'authenticated'

  const [formState, setFormState] = useState<GuildCreationInput>({
    name: '',
    server: 'Antica',
    private: false,
    description: '',
    avatarId: avatar.getRandom.id(),
    avatarDegree: avatar.getRandom.degree(),
  })

  const invalidName = formState.name.length < 2

  return (
    <Dialog isOpen onClose={onClose} heading="Create new hunting group">
      <div className="my-8 grid gap-6">
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

            <div className="relative">
              <Avatar
                alt={formState.name}
                avatarId={formState.avatarId}
                avatarDegree={formState.avatarDegree}
              />

              <button
                type="button"
                className="absolute top-[calc(100%+8px)] flex w-full cursor-pointer items-center justify-center gap-1 text-xs"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    avatarId: avatar.getRandom.id(),
                    avatarDegree: avatar.getRandom.degree(),
                  }))
                }
              >
                <DiceIcon className="fill-onSurface h-3 w-3" />{' '}
                <span className="text-onSurface underline underline-offset-2">
                  Roll
                </span>
              </button>
            </div>
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

        {notAuthed && (
          <Alert variant="alert">
            You must{' '}
            <NextLink
              href={routes.LOGIN}
              className="text-onAlert font-bold underline underline-offset-2"
            >
              log in
            </NextLink>{' '}
            to create a hunting group
          </Alert>
        )}
      </div>

      <div className="flex items-center justify-end">
        <Button onClick={onClose} hollow pill>
          Cancel
        </Button>
        <Button pill disabled={notAuthed || invalidName}>
          Create
        </Button>
      </div>
    </Dialog>
  )
}

export default CreateGuildDialog
