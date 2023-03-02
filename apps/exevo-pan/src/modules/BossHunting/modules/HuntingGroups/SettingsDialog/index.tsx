import clsx from 'clsx'
import { useState } from 'react'
import {
  Dialog,
  Alert,
  LoadingAlert,
  Button,
  Switch,
  Checkbox,
} from 'components/Atoms'
import { usePushNotifications } from 'hooks'
import { toast } from 'react-hot-toast'
import type { GuildMember } from '@prisma/client'
import { useBlacklist, bossNames } from './useBlacklist'

/* @ ToDo: i18n */

/* 

- trpc + button state

*/

type SettingsDialogProps = {
  onClose: () => void
  currentMember: GuildMember
}

const AlertButton = ({
  className,
  ...props
}: JSX.IntrinsicElements['button']) => (
  <button
    type="button"
    className={clsx(
      className,
      'text-primaryHighlight cursor-pointer font-bold underline underline-offset-2',
    )}
    {...props}
  />
)

const SettingsDialog = ({ onClose, currentMember }: SettingsDialogProps) => {
  const {
    isSupported,
    permission,
    subscribeDevice,
    sendClientNotification,
    isLoading: loadingDeviceSubscription,
  } = usePushNotifications()

  const registeredDevice = permission === 'granted'

  const [disabledNotifications, setDisabledNotifications] = useState(
    currentMember.disabledNotifications,
  )
  const blacklist = useBlacklist(currentMember.blacklistedBosses)

  return (
    <Dialog heading="Settings" isOpen onClose={onClose}>
      {loadingDeviceSubscription && <LoadingAlert>Loading...</LoadingAlert>}

      <div className="grid gap-6">
        {isSupported ? (
          <Alert variant="primary" noIcon>
            {registeredDevice ? (
              <>
                <p>This device is registered!</p>
                <p>
                  How about trying a{' '}
                  <AlertButton
                    onClick={() =>
                      sendClientNotification({
                        title: 'Hey there 👋',
                        text: 'Everything looking good!',
                      })
                    }
                  >
                    test
                  </AlertButton>{' '}
                  notification? 🔔
                </p>
              </>
            ) : (
              <>
                Please{' '}
                <AlertButton
                  onClick={() =>
                    subscribeDevice()
                      .then(() =>
                        toast.success(
                          'This device was registered successfully!',
                        ),
                      )
                      .catch(() => toast.error('Oops! Something went wrong'))
                  }
                >
                  enable notifications
                </AlertButton>{' '}
                on this device
              </>
            )}
          </Alert>
        ) : (
          <Alert variant="alert">
            Web Push Notifications not supported by this device
          </Alert>
        )}

        <Switch
          active={!disabledNotifications}
          onClick={() => setDisabledNotifications((prev) => !prev)}
          disabled={!registeredDevice}
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
                disabled={!registeredDevice}
              />
            ))}
          </div>
        </div>
      </div>

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
