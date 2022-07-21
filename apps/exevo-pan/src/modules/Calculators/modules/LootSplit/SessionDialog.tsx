import {
  Dialog,
  TextArea,
  CopyButton,
  Button,
  NumericInput,
} from 'components/Atoms'
import { ExtraExpenses } from './types'

export type SessionDialogProps = {
  isOpen: boolean
  sessionData?: string
  extraExpenses?: ExtraExpenses
  onClose: () => void
}

const SessionDialog = ({
  isOpen,
  sessionData = '',
  extraExpenses = {},
  onClose,
}: SessionDialogProps) => (
  <Dialog isOpen={isOpen} onClose={onClose}>
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

    {Object.entries(extraExpenses).map(([name, cost]) => (
      <NumericInput
        key={`extra-cost-${name}`}
        label={name}
        value={cost}
        disabled
      />
    ))}

    <Button type="button" onClick={onClose} pill className="ml-auto mt-4 block">
      Ok
    </Button>
  </Dialog>
)

export default SessionDialog
