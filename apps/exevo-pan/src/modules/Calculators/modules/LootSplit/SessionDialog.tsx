import { Dialog, TextArea, CopyButton, Button, Text } from 'components/Atoms'
import { Group, Chip } from '../../components'
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
  <Dialog
    isOpen={isOpen}
    onClose={onClose}
    className="w-full max-w-[320px] md:max-w-[540px]"
  >
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
      className="mx-auto mt-6 h-96"
    />

    {Object.keys(extraExpenses).length > 0 && (
      <Group className="mt-6">
        <strong>Extra expenses</strong>
        <div className="flex flex-wrap items-center gap-3">
          {Object.entries(extraExpenses).map(([name, cost]) => (
            <Chip key={`extra-cost-${name}`}>
              {name}: <Text.GoldCoin value={cost} />
            </Chip>
          ))}
        </div>
      </Group>
    )}

    <Button type="button" onClick={onClose} pill className="ml-auto mt-4 block">
      Ok
    </Button>
  </Dialog>
)

export default SessionDialog
