import clsx from 'clsx'
import { Dialog, Tabs, Alert, Button, LoadingAlert } from 'components/Atoms'
import { usePushNotifications } from 'hooks'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import { constTokens as bossTokens } from 'data-dictionary/dist/dictionaries/bosses'

/* @ ToDo: i18n */

type SettingsDialogProps = {
  onClose: () => void
}

const bossNames = Object.values(bossTokens)

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

const SettingsDialog = ({ onClose }: SettingsDialogProps) => {
  const {
    isSupported,
    permission,
    subscribeDevice,
    sendClientNotification,
    isLoading: loadingDeviceSubscription,
  } = usePushNotifications()

  return (
    <Dialog heading="Settings" isOpen onClose={onClose}>
      <Tabs.Group>
        <Tabs.Panel label="Register device">
          {loadingDeviceSubscription && <LoadingAlert>Loading...</LoadingAlert>}

          {isSupported ? (
            <Alert variant="primary" noIcon>
              {permission === 'granted' ? (
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
}

export default SettingsDialog
