import { useTranslations } from 'contexts/useTranslation'
import { useSession } from 'next-auth/react'
import { SubHeader } from 'templates'
import { PersonIcon, PapyrusIcon, BlogIcon, AlertIcon } from 'assets/svgs'
import { routes } from 'Constants'
import UserCard from './UserCard'

type LayoutProps = {
  children: React.ReactNode
  isLoading?: boolean
}

const Layout = ({ isLoading = false, children }: LayoutProps) => {
  const {
    translations: { dashboard },
  } = useTranslations()
  const i18n = dashboard.Layout

  const { data: session } = useSession()

  return (
    <>
      <SubHeader
        navItems={[
          {
            title: i18n.nav.root,
            href: routes.DASHBOARD.ROOT,
            icon: <PersonIcon />,
          },
          {
            title: i18n.nav.transactions,
            href: routes.DASHBOARD.TRANSACTIONS,
            icon: <PapyrusIcon />,
          },
          {
            title: i18n.nav.notifications,
            href: routes.DASHBOARD.AUCTION_NOTIFICATIONS,
            icon: <AlertIcon />,
          },
          {
            title: i18n.nav.devices,
            href: routes.DASHBOARD.DEVICES,
            icon: <BlogIcon />,
          },
        ]}
      />
      <main className="inner-container child:animate-fadeIn relative grid gap-8 py-8 lg:block">
        {session && !isLoading ? (
          <>
            <section className="animate-fadeIn lg:mb-8">
              <UserCard user={session.user} />
            </section>

            {children}
          </>
        ) : (
          <div className="absolute-centered">
            <div className="loading-spinner h-8 w-8" role="alert" />
          </div>
        )}
      </main>
    </>
  )
}

export default Layout
