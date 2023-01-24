import Head from 'next/head'
import { Template } from 'modules/Admin'
import { GetStaticProps } from 'next'
import { buildPageTitle } from 'utils'
import { usePushNotifications } from 'hooks'
import { Button } from 'components/Atoms'
import { common } from 'locales'

export default function AuctionHighlights() {
  const pageTitle = buildPageTitle('Notifications')

  const { isSupported, permission, subscribeDevice, sendClientNotification } =
    usePushNotifications()

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Template>
        <div className="mx-auto grid max-w-xl gap-4">
          <div className="card grid gap-2 text-base">
            <p className="flex items-center gap-1">
              Suported:{' '}
              <code className="code">{isSupported ? 'true' : 'false'}</code>
            </p>

            <p className="flex items-center gap-1">
              Permission: <code className="code">{permission}</code>
            </p>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <Button onClick={subscribeDevice}>Register device</Button>
            <Button
              onClick={() =>
                sendClientNotification({
                  title: 'Exevo Pan',
                  text: 'This is a test!',
                })
              }
            >
              Test notification
            </Button>
          </div>
        </div>
      </Template>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
    },
  },
})
