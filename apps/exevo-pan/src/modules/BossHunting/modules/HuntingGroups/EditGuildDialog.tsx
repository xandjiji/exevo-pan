import { useState, useCallback } from 'react'
import {
  Dialog,
  Input,
  Checkbox,
  TextArea,
  Button,
  Alert,
} from 'components/Atoms'
import { InfoTooltip } from 'components/Organisms'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { trpc } from 'lib/trpc'
import { addLocalePrefix, getGuildPermalink } from 'utils'
import { guildValidationRules } from 'Constants'
import type { GuildEditInput } from 'server/guild/crud'
import { useGuildData } from './contexts/useGuildData'
import { RollAvatar } from './components'

/* @ ToDo:

- caracteres especiais, emoji, xss, etc?

- i18n

*/

type EditGuildDialogProps = {
  onClose: () => void
}

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
  const { guild } = useGuildData()

  const router = useRouter()

  const [formState, setFormState] = useState<GuildEditInput>({
    guildId: guild.id,
    name: guild.name,
    private: guild.private,
    description: guild.description ?? undefined,
    messageBoard: guild.messageBoard ?? undefined,
    avatarId: guild.avatarId,
    avatarDegree: guild.avatarDegree,
  })

  const updateGuild = trpc.updateGuild.useMutation({
    onSuccess: () => {
      toast.success('Guild was updated successfuly!')
      window.location.pathname = addLocalePrefix({
        route: getGuildPermalink(formState.name ?? guild.name),
        locale: router.locale,
      })
    },
    onError: () => toast.error('Oops! Something went wrong'),
  })

  const errors = new Set<string>(
    Object.keys(updateGuild.error?.data?.zodError?.fieldErrors ?? []),
  )

  const groupPrivacyError = updateGuild.error?.message === 'PRO_REQUIRED'

  const invalidForm = isFormInvalid(formState)

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
          maxLength={guildValidationRules.name.MAX}
          value={formState.name}
          error={
            errors.has('name') || !!updateGuild.error?.data?.prisma
              ? `Must be a unique name between ${guildValidationRules.name.MIN}-${guildValidationRules.name.MAX} characters`
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
        label="Description"
        placeholder="Add group description"
        maxLength={guildValidationRules.description.MAX}
        value={formState.description}
        className="min-h-[120px]"
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, description: e.target.value }))
        }
        error={errors.has('description')}
      />

      <TextArea
        label="Message board (only seen by members)"
        placeholder="Add a message to the board"
        maxLength={guildValidationRules.messageBoard.MAX}
        value={formState.messageBoard}
        className="min-h-[120px]"
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, messageBoard: e.target.value }))
        }
        error={errors.has('messageBoard')}
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

      {groupPrivacyError && (
        <Alert variant="alert" className="mt-1">
          At least one Exevo Pro group member is required to set a private group
        </Alert>
      )}

      <div className="mt-4 flex items-center justify-end gap-4">
        <Button pill hollow onClick={onClose}>
          Cancel
        </Button>
        <Button
          pill
          loading={updateGuild.isLoading}
          disabled={updateGuild.isLoading || invalidForm}
          onClick={() => updateGuild.mutate(formState)}
        >
          Save
        </Button>
      </div>
    </Dialog>
  )
}

export default EditGuildDialog
