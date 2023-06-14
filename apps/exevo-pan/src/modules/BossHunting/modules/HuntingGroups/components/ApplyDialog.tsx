import { useState } from 'react'
import { useTranslations, templateString } from 'contexts/useTranslation'
import { Dialog, Input, TextArea, Button } from 'components/Atoms'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { guildValidationRules } from 'Constants'

type ApplyDialogProps = {
  guildId: string
  guildName: string
  defaultUserName: string
  onClose: () => void
}

const ApplyDialog = ({
  guildId,
  guildName,
  defaultUserName,
  onClose,
}: ApplyDialogProps) => {
  const { huntingGroups } = useTranslations()

  const i18n = huntingGroups.ApplyDialog

  const [applyAs, setApplyAs] = useState(defaultUserName)
  const [message, setMessage] = useState('')
  const [alreadyJoined, setAlreadyJoined] = useState(false)

  const applyAction = trpc.applyToGuild.useMutation({
    onSuccess: () => {
      toast.success(i18n.toast.success)
      onClose()
    },
    onError: () => {
      toast.error(i18n.toast.error)
      setAlreadyJoined(true)
    },
  })

  const isValid = {
    name:
      applyAs.length >= guildValidationRules.name.MIN &&
      applyAs.length <= guildValidationRules.name.MAX,
    message: message.length <= guildValidationRules.applyMessage.MAX,
  }

  return (
    <Dialog
      heading={templateString(i18n.heading, { guildName })}
      isOpen
      onClose={onClose}
      className="sm:min-w-[460px]"
    >
      <div className="grid gap-6">
        <Input
          label={i18n.applyAs}
          value={applyAs}
          onChange={(e) => setApplyAs(e.target.value)}
          maxLength={guildValidationRules.name.MAX}
          placeholder={defaultUserName}
          error={
            !isValid.name
              ? templateString(i18n.nameError, {
                  min: guildValidationRules.name.MIN,
                  max: guildValidationRules.name.MAX,
                })
              : undefined
          }
        />

        <TextArea
          label={i18n.message}
          maxLength={guildValidationRules.applyMessage.MAX}
          placeholder={i18n.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex items-center justify-end gap-4">
          <Button hollow pill onClick={onClose}>
            {i18n.cancel}
          </Button>
          <Button
            pill
            onClick={() => applyAction.mutate({ guildId, applyAs, message })}
            loading={applyAction.isLoading}
            disabled={
              applyAction.isLoading ||
              !isValid.name ||
              !isValid.message ||
              alreadyJoined
            }
          >
            {i18n.submit}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default ApplyDialog
