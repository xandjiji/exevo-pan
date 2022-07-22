import { useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
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
  const {
    translations: { calculators },
  } = useTranslations()

  const closeOnEnter = useCallback((e) => {
    if (e.key === 'Enter') onClose()
  }, [])

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-[320px] md:max-w-[540px]"
    >
      <Group className="w-full">
        <strong className="mb-2">
          {calculators.LootSplit.AdvancedOptionsDialog.addExtraExpenses}:
        </strong>
        <div className="grid grid-cols-2 place-items-end gap-4">
          {playerReceipts?.map(({ name }) => (
            <NumericInput
              key={`extra-${name}`}
              label={name}
              value={extraExpenses[name]}
              onChange={(value) => setExtraExpenses({ [name]: value })}
              placeholder={
                calculators.LootSplit.AdvancedOptionsDialog.extraCostPlaceholder
              }
              onKeyPress={closeOnEnter}
              className="w-full"
            />
          ))}
        </div>
      </Group>

      <Button
        type="button"
        onClick={onClose}
        pill
        className="ml-auto mt-4 block"
      >
        {calculators.LootSplit.actions.done}
      </Button>
    </Dialog>
  )
}

export default AdvancedOptionsDialog
