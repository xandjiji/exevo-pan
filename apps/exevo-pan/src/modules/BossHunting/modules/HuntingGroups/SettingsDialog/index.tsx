import { useState } from 'react'
import { Dialog, Tabs, Button, Switch, Checkbox } from 'components/Atoms'
import type { GuildMember } from '@prisma/client'
import { RegisterDevice } from './RegisterDevice'
import { useBlacklist, bossNames } from './useBlacklist'

/* @ ToDo: i18n */

/* 

- ajustar dialog dimensions
- trpc + button state

*/

type SettingsDialogProps = {
  onClose: () => void
  currentMember: GuildMember
}

const SettingsDialog = ({ onClose, currentMember }: SettingsDialogProps) => {
  const [disabledNotifications, setDisabledNotifications] = useState(
    currentMember.disabledNotifications,
  )
  const blacklist = useBlacklist(currentMember.blacklistedBosses)

  return (
    <Dialog heading="Settings" isOpen onClose={onClose}>
      <Tabs.Group>
        <Tabs.Panel label="Register device">
          <RegisterDevice />
        </Tabs.Panel>
        <Tabs.Panel label="Customize notifications">
          <div className="grid gap-6">
            <Switch
              active={!disabledNotifications}
              onClick={() => setDisabledNotifications((prev) => !prev)}
            >
              Receive notifications from this group
            </Switch>

            <div className="grid gap-2">
              <h5 className="text-s">Receive notifications for:</h5>

              <div className="custom-scrollbar grid max-h-40 grid-cols-2 gap-x-4 gap-y-2 overflow-auto sm:grid-cols-3 md:max-h-60">
                {bossNames.map((boss) => (
                  <Checkbox
                    key={boss}
                    label={boss}
                    checked={!blacklist.value.set.has(boss)}
                    onChange={() => blacklist.toggleValue(boss)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Tabs.Panel>
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
}

export default SettingsDialog
