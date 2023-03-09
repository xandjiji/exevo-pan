import { memo } from 'react'
import { SubHeader, Main } from 'templates'
import { useRoutes } from '../routes'

type ComponentProps = {
  children: React.ReactNode
}

const Template = ({ children }: ComponentProps) => {
  const routes = useRoutes()

  return (
    <Main>
      <SubHeader navItems={routes} />
      <main className="pb-6">{children}</main>
    </Main>
  )
}

export default memo(Template)
