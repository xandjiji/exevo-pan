import clsx from 'clsx'
import { Alert, LoadingAlert } from 'components/Atoms'
import { usePushNotifications } from 'hooks'
import { toast } from 'react-hot-toast'

/* @ ToDo: i18n */

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

export const RegisterDevice = () => {
  const {
    isSupported,
    permission,
    subscribeDevice,
    sendClientNotification,
    isLoading: loadingDeviceSubscription,
  } = usePushNotifications()

  return (
    <>
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
                      toast.success('This device was registered successfully!'),
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
    </>
  )
}
