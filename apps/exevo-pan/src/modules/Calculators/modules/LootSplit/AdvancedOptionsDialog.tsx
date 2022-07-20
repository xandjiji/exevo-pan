import { Dialog, NumericInput, Button } from 'components/Atoms'
import { Group } from '../../components'
import { Receipt } from './types'

type AdvancedOptionsDialogProps = {
  playerReceipts: Receipt[]
  isOpen: boolean
  onClose: () => void
}

const AdvancedOptionsDialog = ({
  playerReceipts,
  isOpen,
  onClose,
}: AdvancedOptionsDialogProps) => (
  <Dialog isOpen={isOpen} onClose={onClose}>
    <Group>
      <strong>Add extra expenses:</strong>
      {playerReceipts?.map(({ name }) => (
        <NumericInput key={`extra-${name}`} label={name} onChange={() => {}} />
      ))}
    </Group>

    <Button type="button" onClick={onClose} pill className="ml-auto mt-4 block">
      Ok
    </Button>
  </Dialog>
)

export default AdvancedOptionsDialog
