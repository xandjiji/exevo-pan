import { useState } from 'react'
import { Dialog, TextArea, Button } from 'components/Atoms'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { guildValidationRules } from 'Constants'

/* @ ToDo: i18n */

type NotificationDialogProps = {
  guildId: string
  onClose: () => void
}

const NotificationDialog = ({ guildId, onClose }: NotificationDialogProps) => {
  const [message, setMessage] = useState('')

  /* const applyAction = trpc.applyToGuild.useMutation({
    onSuccess: () => {
      toast.success('Application sent!')
      onClose()
    },
    onError: () => {
      toast.error('You already joined this guild!')
      setAlreadyJoined(true)
    },
  }) */

  console.log(9)

  return (
    <Dialog heading="Notificate group" isOpen onClose={onClose}>
      <div className="grid gap-4">
        <TextArea
          label="Message"
          maxLength={guildValidationRules.notificationMessage.MAX}
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
            /* onClick={() => applyAction.mutate({ guildId, applyAs, message })}
            loading={applyAction.isLoading}
            disabled={
              applyAction.isLoading ||
              !isValid.name ||
              !isValid.message ||
              alreadyJoined
            } */
          >
            Submit
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default NotificationDialog
