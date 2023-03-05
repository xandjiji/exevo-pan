import { useState, useCallback } from 'react'
import { Dialog, Button, Input, Checkbox, Alert } from 'components/Atoms'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { Select, InfoTooltip } from 'components/Organisms'
import { useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { trpc } from 'lib/trpc'
import { avatar, getGuildPermalink } from 'utils'
import { routes } from 'Constants'
import type { TRPCRouteInputs } from 'pages/api/trpc/[trpc]'
import { RollAvatar } from './components'

/* @ ToDo:

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
  const { data } = useSession()
  const notAuthed = !data?.user
  const isPro = !!data?.user.proStatus

  const [formState, setFormState] = useState<TRPCRouteInputs['createGuild']>({
    name: '',
    private: false,
    server: 'Antica',
    description: '',
    avatarId: avatar.getRandom.id(),
    avatarDegree: avatar.getRandom.degree(),
  })

  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const { mutate, isLoading } = trpc.createGuild.useMutation({
    onSuccess: ({ name }) => {
      onClose()
      toast.success('Hunting group created!')
      router.push(getGuildPermalink(name))
    },
    onError: () => {
      setErrorMessage(`'${formState.name}' already exists`)
      toast.error('Something went wrong!')
    },
  })

  const invalidName = formState.name.length < 2

  const disableSubmit = notAuthed || invalidName || isLoading || !!errorMessage

  return (
    <Dialog isOpen onClose={onClose} heading="Create new hunting group">
      <div className="my-8 grid gap-6">
        <div className="flex flex-col gap-4">
          <div className="mb-4 flex items-end gap-8">
            <Input
              label="Group name"
              value={formState.name}
              onChange={(e) => {
                setErrorMessage('')
                setFormState((prev) => ({ ...prev, name: e.target.value }))
              }}
              error={errorMessage}
              maxLength={32}
              placeholder="Choose a group name"
              className="grow"
            />

            <RollAvatar
              avatarId={formState.avatarId}
              avatarDegree={formState.avatarDegree}
              onChange={useCallback(
                (newAvatar) =>
                  setFormState((prev) => ({ ...prev, ...newAvatar })),
                [],
              )}
            />
          </div>

          <Select
            label="Server"
            options={serverOptions}
            value={formState.server}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, server: e.target.value }))
            }
          />

          <Checkbox
            label={
              <span className="flex items-center gap-1.5">
                Private group{' '}
                <InfoTooltip
                  labelSize
                  content={
                    <div>
                      <p>
                        A private group can be found, but its members will be
                        hidden
                      </p>

                      {!isPro && (
                        <NextLink
                          href={routes.EXEVOPRO}
                          className="text-onSurface mt-4 block"
                        >
                          <strong className="text-rare">Exevo Pro 🕵️</strong>{' '}
                          exclusive
                        </NextLink>
                      )}
                    </div>
                  }
                />
              </span>
            }
            aria-label="Private group"
            checked={formState.private}
            onChange={() =>
              setFormState((prev) => ({ ...prev, private: !formState.private }))
            }
            disabled={!isPro}
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

      <div className="flex items-center justify-end gap-4">
        <Button onClick={onClose} hollow pill>
          Cancel
        </Button>
        <Button
          pill
          disabled={disableSubmit}
          loading={isLoading}
          onClick={() => mutate(formState)}
        >
          Create
        </Button>
      </div>
    </Dialog>
  )
}

export default CreateGuildDialog
