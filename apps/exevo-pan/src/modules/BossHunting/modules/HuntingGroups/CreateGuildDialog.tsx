import { useState, useCallback } from 'react'
import {
  Dialog,
  Button,
  Input,
  Checkbox,
  Alert,
  ExevoProLink,
} from 'components/Atoms'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { Select, InfoTooltip } from 'components/Organisms'
import {
  useTranslations,
  templateString,
  templateMessage,
} from 'contexts/useTranslation'
import { useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { trpc } from 'lib/trpc'
import { avatar, getGuildPermalink } from 'utils'
import { routes } from 'Constants'
import type { TRPCRouteInputs } from 'pages/api/trpc/[trpc]'
import { RollAvatar } from './components'

type CreateGuildDialogProps = {
  serverOptions: Option[]
  onClose: () => void
}

const CreateGuildDialog = ({
  serverOptions,
  onClose,
}: CreateGuildDialogProps) => {
  const { common, huntingGroups } = useTranslations()
  const i18n = huntingGroups.CreateGuildDialog

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
      toast.success(i18n.successToast)
      router.push(getGuildPermalink(name))
    },
    onError: () => {
      setErrorMessage(
        templateString(i18n.errorMessage, { name: formState.name }),
      )
      toast.error(common.genericError)
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
              label={i18n.groupName}
              value={formState.name}
              onChange={(e) => {
                setErrorMessage('')
                setFormState((prev) => ({ ...prev, name: e.target.value }))
              }}
              error={errorMessage}
              maxLength={32}
              placeholder={i18n.namePlaceholder}
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
                {i18n.privateGroup}{' '}
                <InfoTooltip
                  labelSize
                  content={
                    <div>
                      <p>{i18n.privateTooltip}</p>

                      {!isPro && (
                        <NextLink
                          href={routes.EXEVOPRO}
                          className="text-onSurface mt-4 block"
                        >
                          {templateMessage(i18n.exevoProExclusive, {
                            exevopro: <ExevoProLink>🕵️</ExevoProLink>,
                          })}
                        </NextLink>
                      )}
                    </div>
                  }
                />
              </span>
            }
            aria-label={i18n.privateGroup}
            checked={formState.private}
            onChange={() =>
              setFormState((prev) => ({ ...prev, private: !formState.private }))
            }
            disabled={!isPro}
          />
        </div>

        {notAuthed && (
          <Alert variant="alert">
            {templateMessage(i18n.unauthedAlert, {
              login: (
                <NextLink
                  href={routes.LOGIN}
                  className="text-onAlert font-bold underline underline-offset-2"
                >
                  {i18n.login}
                </NextLink>
              ),
            })}
          </Alert>
        )}
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button onClick={onClose} hollow pill>
          {i18n.cancel}
        </Button>
        <Button
          pill
          disabled={disableSubmit}
          loading={isLoading}
          onClick={() => mutate(formState)}
        >
          {i18n.create}
        </Button>
      </div>
    </Dialog>
  )
}

export default CreateGuildDialog
