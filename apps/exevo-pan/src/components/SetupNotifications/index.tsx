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
        {/* {templateMessage(
          homepage.AuctionsGrid.useAuctionNotifications.notAuthed,
          {
            logIn: (
              <NextLink
                href={routes.LOGIN}
              >
              <Action className="text-onAlert">
              {homepage.AuctionsGrid.useAuctionNotifications.logIn}
              </Action>
              </NextLink>
            ),
          },
        )} */}
      </Alert>
    )
  }

  if (permission !== 'granted') {
    return (
      <Alert variant="primary">
        {/* {templateMessage(
          homepage.AuctionsGrid.useAuctionNotifications.permission,
          {
            enableNotifications: (
              <button
                type="button"
                className="text-primaryHighlight cursor-pointer font-bold underline underline-offset-2"
                onClick={subscribeDevice}
              >
                {
                  homepage.AuctionsGrid.useAuctionNotifications
                    .enableNotifications
                }
              </button>
            ),
          },
        )} */}
      </Alert>
    )
  }

  return (
    <Alert variant="primary" noIcon>
      This device is receiving{' '}
      <ActionButton
        onClick={() =>
          sendClientNotification({
            title: 'Hey there!',
            text: 'How are you doing?',
          })
        }
      >
        notifications
      </ActionButton>
      !
    </Alert>
  )
}

export default SetupNotifications
