import clsx from 'clsx'
import { useCallback } from 'react'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import NextLink from 'next/link'
import { usePushNotifications } from 'hooks'
import { Alert } from 'components/Atoms'
import { routes } from 'Constants'

const ActionButton = ({
  className,
  ...props
}: JSX.IntrinsicElements['button']) => (
  <button
    type="button"
    className={clsx(
      className,
      'cursor-pointer font-bold underline underline-offset-2',
    )}
    {...props}
  />
)

type SetupNotificationsProps = {
  onRegister?: () => void
} & JSX.IntrinsicElements['div']

const SetupNotifications = ({
  onRegister,
  ...props
}: SetupNotificationsProps) => {
  const { common } = useTranslations()
  const i18n = common.SetupNotifications

  const session = useSession()
  const isAuthed = !!session.data
  const { isSupported, permission, subscribeDevice, sendClientNotification } =
    usePushNotifications()

  const handleSubscribe = useCallback(
    () =>
      toast.promise(subscribeDevice().then(onRegister), {
        error: common.genericError,
        loading: common.genericLoading,
        success: i18n.successMessage,
      }),
    [common, i18n, subscribeDevice],
  )

  if (!isSupported) {
    return (
      <Alert variant="alert" {...props}>
        Your device does not support notifications
      </Alert>
    )
  }

  if (!isAuthed) {
    return (
      <Alert variant="alert" {...props}>
        {templateMessage(i18n.notAuthed, {
          logIn: (
            <NextLink href={routes.LOGIN} prefetch={false}>
              <ActionButton className="text-onAlert">{i18n.logIn}</ActionButton>
            </NextLink>
          ),
        })}
      </Alert>
    )
  }

  if (permission !== 'granted') {
    return (
      <Alert variant="primary" {...props}>
        {templateMessage(i18n.permission, {
          enableNotifications: (
            <ActionButton
              type="button"
              className="text-primaryHighlight"
              onClick={handleSubscribe}
            >
              {i18n.enableNotifications}
            </ActionButton>
          ),
        })}
      </Alert>
    )
  }

  return (
    <Alert variant="primary" noIcon {...props}>
      {templateMessage(i18n.deviceReady, {
        notifications: (
          <ActionButton
            className="text-primaryHighlight"
            onClick={() =>
              sendClientNotification({
                title: i18n.testTitle,
                text: i18n.testText,
              })
            }
          >
            {i18n.notifications}
          </ActionButton>
        ),
      })}
    </Alert>
  )
}

export default SetupNotifications
