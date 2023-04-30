/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback } from 'react'
import { useTranslations, templateString } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import {
  Dialog,
  Input,
  Checkbox,
  TextArea,
  Button,
  Alert,
} from 'components/Atoms'
import { InfoTooltip } from 'components/Organisms'
import { toast } from 'react-hot-toast'
import { trpc } from 'lib/trpc'
import { guildValidationRules } from 'Constants'
import type { TRPCRouteInputs } from 'pages/api/trpc/[trpc]'
import { useGuildData } from './contexts/useGuildData'
import { RollAvatar } from './components'

type EditGuildDialogProps = {
  onClose: () => void
}

type GuildEditInput = TRPCRouteInputs['updateGuild']

const isFormInvalid = ({
  name = '',
  description = '',
  messageBoard = '',
}: GuildEditInput): boolean =>
  name.length < guildValidationRules.name.MIN ||
  name.length > guildValidationRules.name.MAX ||
  description.length > guildValidationRules.description.MAX ||
  messageBoard.length > guildValidationRules.description.MAX

const EditGuildDialog = ({ onClose }: EditGuildDialogProps) => {
  const {
    translations: { common, huntingGroups },
  } = useTranslations()
  const i18n = huntingGroups.EditGuildDialog

  const { guild, setGuildData } = useGuildData()
  const router = useRouter()

  const [formState, setFormState] = useState<GuildEditInput>({
    guildId: guild.id,
    name: guild.name,
    private: guild.private,
    description: guild.description ?? undefined,
    messageBoard: guild.messageBoard ?? undefined,
    avatarId: guild.avatarId,
    avatarDegree: guild.avatarDegree,
    eventEndpoint: guild.eventEndpoint ?? undefined,
  })

  const updateGuild = trpc.updateGuild.useMutation({
    onSuccess: (updatedGuild) => {
      setGuildData({ guild: updatedGuild })
      toast.success(i18n.successToast)

      if (guild.name !== updatedGuild.name) {
        const newName = updatedGuild.name
        router.push({ query: { guildName: newName } })
      }

      onClose()
    },
    onError: () => toast.error(common.genericError),
  })

  const errors = new Set<string>(
    Object.keys(updateGuild.error?.data?.zodError?.fieldErrors ?? []),
  )

  const groupPrivacyError = updateGuild.error?.message === 'PRO_REQUIRED'

  const invalidForm = isFormInvalid(formState)

  return (
    <Dialog
      heading={i18n.heading}
      isOpen
      onClose={onClose}
      className="grid gap-2 sm:min-w-[420px]"
    >
      <div className="mb-4 flex items-end gap-8">
        <Input
          label={i18n.guildName}
          placeholder={i18n.guildNamePlaceholder}
          maxLength={guildValidationRules.name.MAX}
          value={formState.name}
          error={
            errors.has('name') || !!updateGuild.error?.data?.prisma
              ? templateString(i18n.nameError, {
                  min: guildValidationRules.name.MIN,
                  max: guildValidationRules.name.MAX,
                })
              : undefined
          }
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
        label={i18n.description}
        placeholder={i18n.descriptionPlaceholder}
        maxLength={guildValidationRules.description.MAX}
        value={formState.description}
        className="min-h-[120px]"
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, description: e.target.value }))
        }
        error={errors.has('description')}
      />

      <TextArea
        label={i18n.messageBoard}
        placeholder={i18n.messageBoardPlaceholder}
        maxLength={guildValidationRules.messageBoard.MAX}
        value={formState.messageBoard}
        className="min-h-[120px]"
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, messageBoard: e.target.value }))
        }
        error={errors.has('messageBoard')}
      />

      <div className="mb-3 grid gap-2">
        <Input
          label="Notification Webhook"
          placeholder="https://discord.com/api/webhooks/1101156871835540426/MQK9bYFHByzD4-c7aqJGoTVjF_0K8nupFZogMm6cLtQJKl4vxpiW74wGFcPyNZUF1JHF"
          value={formState.eventEndpoint}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, eventEndpoint: e.target.value }))
          }
        />

        <div className="flex items-center justify-between gap-2">
          <p className="font-light">
            Check out the{' '}
            <a href="#" className="text-primaryHighlight font-bold">
              documentation
            </a>
          </p>

          {!!formState.eventEndpoint && (
            <button
              type="button"
              className="text-primaryHighlight cursor-pointer font-bold"
            >
              test webhook ☎️
            </button>
          )}
        </div>
      </div>

      <Checkbox
        label={
          <span className="flex items-center gap-1.5">
            {i18n.privateGroup}{' '}
            <InfoTooltip labelSize content={i18n.privateTooltip} />
          </span>
        }
        aria-label={i18n.privateGroup}
        checked={formState.private}
        onChange={() =>
          setFormState((prev) => ({ ...prev, private: !formState.private }))
        }
      />

      {groupPrivacyError && (
        <Alert variant="alert" className="mt-1">
          {i18n.exevoProRequired}
        </Alert>
      )}

      <div className="mt-4 flex items-center justify-end gap-4">
        <Button pill hollow onClick={onClose}>
          {i18n.cancel}
        </Button>
        <Button
          pill
          loading={updateGuild.isLoading}
          disabled={updateGuild.isLoading || invalidForm}
          onClick={() => updateGuild.mutate(formState)}
        >
          {i18n.save}
        </Button>
      </div>
    </Dialog>
  )
}

export default EditGuildDialog
