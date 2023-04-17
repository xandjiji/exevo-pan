import clsx from 'clsx'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { useSession } from 'next-auth/react'
import { trpc } from 'lib/trpc'
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

const SetupNotifications = () => {
  const {
    translations: { common },
  } = useTranslations()
  const i18n = common.SetupNotifications

  const session = useSession()
  const isAuthed = !!session.data
  const {
    isSupported,
    permission,
    subscribeDevice,
    isLoading,
    sendClientNotification,
  } = usePushNotifications()

  if (!isSupported) {
    return (
      <Alert variant="alert">Your device does not support notifications</Alert>
    )
  }

  if (!isAuthed) {
    return (
      <Alert variant="alert">
        {templateMessage(i18n.notAuthed, {
          logIn: (
            <NextLink href={routes.LOGIN}>
              <ActionButton className="text-onAlert">{i18n.logIn}</ActionButton>
            </NextLink>
          ),
        })}
      </Alert>
    )
  }

  if (permission !== 'granted') {
    return (
      <Alert variant="primary">
        {templateMessage(i18n.permission, {
          enableNotifications: (
            <ActionButton
              type="button"
              className="text-primaryHighlight"
              onClick={subscribeDevice}
            >
              {i18n.enableNotifications}
            </ActionButton>
          ),
        })}
      </Alert>
    )
  }

  return (
    <Alert variant="primary" noIcon>
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
