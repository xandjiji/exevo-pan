import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { useSession } from 'next-auth/react'
import { trpc } from 'lib/trpc'
import { toast } from 'react-hot-toast'
import NextLink from 'next/link'
import { usePushNotifications } from 'hooks'
import { Alert } from 'components/Atoms'
import { routes } from 'Constants'

const SetupNotifications = () => {
  const {
    translations: { common },
  } = useTranslations()

  const session = useSession()
  const isAuthed = !!session.data
  const { isSupported, permission, subscribeDevice, isLoading } =
    usePushNotifications()

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
                className="text-onAlert font-bold underline underline-offset-2"
              >
                {homepage.AuctionsGrid.useAuctionNotifications.logIn}
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

  return <Alert variant="primary">test you notifications</Alert>
}

export default SetupNotifications
