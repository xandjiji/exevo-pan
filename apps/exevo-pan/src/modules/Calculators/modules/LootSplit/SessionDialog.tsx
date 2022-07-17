import { Dialog, TextArea, CopyButton, Button } from 'components/Atoms'

type SessionDialogProps = {
  sessionData: string
  onClose: () => void
}

const SessionDialog = ({ sessionData, onClose }: SessionDialogProps) => (
  <Dialog isOpen={!!sessionData} onClose={onClose}>
    <TextArea
      label={
        <span className="flex items-center gap-1.5">
          Original hunt session <CopyButton copyString={sessionData} />
        </span>
      }
      aria-label="Original hunt session"
      value={sessionData}
      disabled
      noAlert
      noResize
      className="mx-auto mt-6 h-96 w-64 md:w-[540px]"
    />

    <Button type="button" onClick={onClose} pill className="ml-auto mt-4 block">
      Ok
    </Button>
  </Dialog>
)

export default SessionDialog
