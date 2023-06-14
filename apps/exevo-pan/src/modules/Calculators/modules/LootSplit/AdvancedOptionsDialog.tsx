import { useCallback } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { Dialog, NumericInput, Button, Checkbox } from 'components/Atoms'
import { Group } from '../../components'
import { Receipt, ExtraExpenses } from './types'

type AdvancedOptionsDialogProps = {
  players: string[]
  extraExpenses: ExtraExpenses
  setExtraExpenses: (newExpenses: ExtraExpenses) => void
  removedPlayers: Set<string>
  toggleRemovedPlayers: (name: string) => void
  isOpen: boolean
  onClose: () => void
}

const AdvancedOptionsDialog = ({
  players,
  extraExpenses,
  setExtraExpenses,
  removedPlayers,
  toggleRemovedPlayers,
  isOpen,
  onClose,
}: AdvancedOptionsDialogProps) => {
  const { calculators } = useTranslations()

  const closeOnEnter: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback((e) => {
      if (e.key === 'Enter') onClose()
    }, [])

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      heading={calculators.LootSplit.advancedOptions}
      className="w-full max-w-[320px] md:max-w-[540px]"
    >
      <Group>
        <strong className="mb-2">
          {calculators.LootSplit.AdvancedOptionsDialog.addExtraExpenses}:
        </strong>
        <div className="grid grid-cols-2 place-items-end gap-6">
          {players.map((name) => {
            const playerIsRemoved = removedPlayers.has(name)

            return (
              <div key={`extra-${name}`} className="grid w-full gap-1.5">
                <NumericInput
                  label={
                    <span className={clsx(playerIsRemoved && 'line-through')}>
                      {name}
                    </span>
                  }
                  aria-label={name}
                  value={extraExpenses[name]}
                  onChange={(value) => setExtraExpenses({ [name]: value })}
                  placeholder={
                    calculators.LootSplit.AdvancedOptionsDialog
                      .extraCostPlaceholder
                  }
                  disabled={playerIsRemoved}
                  onKeyPress={closeOnEnter}
                />
                <Checkbox
                  label={
                    calculators.LootSplit.AdvancedOptionsDialog.removePlayer
                  }
                  checked={playerIsRemoved}
                  onClick={() => toggleRemovedPlayers(name)}
                />
              </div>
            )
          })}
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
