import { useSession } from 'next-auth/react'
import UserCard from './UserCard'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession()

  return (
    <main className="inner-container relative grid gap-8 py-8 lg:block">
      {/* ToDo: nav header */}

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
  )
}

export default Layout
