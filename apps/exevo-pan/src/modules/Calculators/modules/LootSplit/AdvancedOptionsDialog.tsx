import { useCallback } from 'react'
import { Dialog, NumericInput, Button } from 'components/Atoms'
import { Group } from '../../components'
import { Receipt, ExtraExpenses } from './types'

type AdvancedOptionsDialogProps = {
  playerReceipts: Receipt[]
  extraExpenses: ExtraExpenses
  setExtraExpenses: (newExpenses: ExtraExpenses) => void
  isOpen: boolean
  onClose: () => void
}

const AdvancedOptionsDialog = ({
  playerReceipts,
  extraExpenses,
  setExtraExpenses,
  isOpen,
  onClose,
}: AdvancedOptionsDialogProps) => {
  const closeOnEnter = useCallback((e) => {
    if (e.key === 'Enter') onClose()
  }, [])

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Group>
        <strong>Add extra expenses:</strong>
        {playerReceipts?.map(({ name }) => (
          <NumericInput
            key={`extra-${name}`}
            label={name}
            value={extraExpenses[name]}
            onChange={(value) => setExtraExpenses({ [name]: value })}
            placeholder="Extra gold costs"
            onKeyPress={closeOnEnter}
          />
        ))}
      </Group>

      <Button
        type="button"
        onClick={onClose}
        pill
        className="ml-auto mt-4 block"
      >
        Ok
      </Button>
    </Dialog>
  )
}

export default AdvancedOptionsDialog
