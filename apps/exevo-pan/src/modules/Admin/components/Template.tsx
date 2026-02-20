import { Main } from 'templates'
import { useSession } from 'next-auth/react'
import Header from './Header'

type ComponentProps = {
  children: React.ReactNode
  bestiaryBannerVariant: number
}

const AdminOnly = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession()
  const isAdmin = data?.user.role === 'ADMIN'

  return <>{isAdmin ? children : null}</>
}

const Template = ({ children, bestiaryBannerVariant }: ComponentProps) => (
  <Main bestiaryBannerVariant={bestiaryBannerVariant}>
    <Header />
    <main className="inner-container py-4">
      <AdminOnly>{children}</AdminOnly>
    </main>
  </Main>
)

export default Template
