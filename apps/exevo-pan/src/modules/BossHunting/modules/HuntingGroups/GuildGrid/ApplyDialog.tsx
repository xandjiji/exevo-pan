import { useState } from 'react'
import { Dialog, Input, TextArea, Button } from 'components/Atoms'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { guildValidationRules } from 'Constants'

/* @ ToDo: i18n */

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
  const [applyAs, setApplyAs] = useState(defaultUserName)
  const [message, setMessage] = useState('')
  const [alreadyApplied, setAlreadyApplied] = useState(false)

  const applyAction = trpc.applyToGuild.useMutation({
    onSuccess: () => {
      toast.success('Application sent!')
      onClose()
    },
    onError: () => {
      toast.error('You already applied to this guild!')
      setAlreadyApplied(true)
    },
  })

  const isValid = {
    name:
      applyAs.length >= guildValidationRules.name.MIN ||
      applyAs.length <= guildValidationRules.name.MAX,
    message: message.length <= guildValidationRules.applyMessage.MAX,
  }

  return (
    <Dialog
      heading={`Apply to ${guildName}`}
      isOpen
      onClose={onClose}
      className="sm:min-w-[460px]"
    >
      <div className="grid gap-4">
        <Input
          label="Apply as"
          value={applyAs}
          onChange={(e) => setApplyAs(e.target.value)}
          maxLength={guildValidationRules.name.MAX}
          placeholder={defaultUserName}
          error={
            !isValid.name
              ? `Name length must be between ${guildValidationRules.name.MIN}-${guildValidationRules.name.MAX} characters`
              : undefined
          }
        />

        <TextArea
          label="Message (optional)"
          maxLength={guildValidationRules.applyMessage.MAX}
          placeholder="I won't SD any Yeties I swear"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex items-center justify-end gap-4">
          <Button hollow pill onClick={onClose}>
            Cancel
          </Button>
          <Button
            pill
            onClick={() => applyAction.mutate({ guildId, applyAs, message })}
            loading={applyAction.isLoading}
            disabled={
              applyAction.isLoading ||
              !isValid.name ||
              !isValid.message ||
              alreadyApplied
            }
          >
            Submit
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default ApplyDialog
