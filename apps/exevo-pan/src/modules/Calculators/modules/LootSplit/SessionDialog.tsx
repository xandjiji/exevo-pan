import { useTranslations } from 'contexts/useTranslation'
import { Dialog, TextArea, CopyButton, Button, Text } from 'components/Atoms'
import { Group, Chip } from '../../components'
import { ExtraExpenses } from './types'

export type SessionDialogProps = {
  isOpen: boolean
  sessionData?: string
  extraExpenses?: ExtraExpenses
  removedPlayers?: Set<string>
  onClose: () => void
}

const SessionDialog = ({
  isOpen,
  sessionData = '',
  extraExpenses = {},
  removedPlayers = new Set([]),
  onClose,
}: SessionDialogProps) => {
  const {
    translations: { calculators },
  } = useTranslations()

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-[320px] md:max-w-[540px]"
    >
      <TextArea
        label={
          <span className="flex items-center gap-1.5">
            {calculators.LootSplit.SessionDialog.originalSession}{' '}
            <CopyButton copyString={sessionData} />
          </span>
        }
        aria-label={calculators.LootSplit.SessionDialog.originalSession}
        value={sessionData}
        disabled
        noResize
        className="mx-auto mt-6 h-96"
      />

      {Object.keys(extraExpenses).length > 0 && (
        <Group className="mt-6">
          <strong>{calculators.LootSplit.SessionDialog.extraExpenses}</strong>
          <div className="flex flex-wrap items-center gap-3">
            {Object.entries(extraExpenses).map(([name, cost]) => (
              <Chip key={`extra-cost-${name}`}>
                {name}: <Text.GoldCoin value={cost} />
              </Chip>
            ))}
          </div>
        </Group>
      )}

      {removedPlayers.size > 0 && (
        <Group className="mt-6">
          <strong>{calculators.LootSplit.SessionDialog.removedPlayers}</strong>
          <ul>
            {[...removedPlayers].map((removedPlayer) => (
              <li key={removedPlayer}>
                <del>{removedPlayer}</del>
              </li>
            ))}
          </ul>
        </Group>
      )}

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

export default SessionDialog
