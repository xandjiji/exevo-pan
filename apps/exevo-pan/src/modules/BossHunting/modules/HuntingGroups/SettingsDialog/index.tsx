import { Dialog, Tabs, Button } from 'components/Atoms'
import { constTokens as bossTokens } from 'data-dictionary/dist/dictionaries/bosses'
import { RegisterDevice } from './RegisterDevice'

/* @ ToDo: i18n */

type SettingsDialogProps = {
  onClose: () => void
}

const bossNames = Object.values(bossTokens)

const SettingsDialog = ({ onClose }: SettingsDialogProps) => (
  <Dialog heading="Settings" isOpen onClose={onClose}>
    <Tabs.Group>
      <Tabs.Panel label="Register device">
        <RegisterDevice />
      </Tabs.Panel>
      <Tabs.Panel label="Customize notifications">a</Tabs.Panel>
    </Tabs.Group>

    <div className="mt-4 flex items-center justify-end gap-4">
      <Button hollow pill onClick={onClose}>
        Cancel
      </Button>
      <Button pill onClick={onClose}>
        Done
      </Button>
    </div>
  </Dialog>
)

export default SettingsDialog
