import { useSession } from 'next-auth/react'
import { SubHeader } from 'templates'
import { PersonIcon, PapyrusIcon, BlogIcon, AlertIcon } from 'assets/svgs'
import { routes } from 'Constants'
import UserCard from './UserCard'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession()

  return (
    <>
      {/* @ ToDo: i18n */}
      <SubHeader
        navItems={[
          {
            title: 'My account',
            href: routes.DASHBOARD.ROOT,
            icon: <PersonIcon />,
          },
          {
            title: 'Transaction history',
            href: routes.DASHBOARD.TRANSACTIONS,
            icon: <PapyrusIcon />,
          },
          {
            title: 'Notification devices',
            href: routes.DASHBOARD.DEVICES,
            icon: <BlogIcon />,
          },
          {
            title: 'Auction notifications',
            href: routes.DASHBOARD.AUCTION_NOTIFICATIONS,
            icon: <AlertIcon />,
          },
        ]}
      />
      <main className="inner-container relative grid gap-8 py-8 lg:block">
        {session ? (
          <>
            <section className="animate-fadeIn">
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
