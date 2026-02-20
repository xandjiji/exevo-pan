import { memo } from 'react'
import { Main, SubHeader } from 'templates'
import { useRoutes } from '../routes'

type ComponentProps = {
  children: React.ReactNode
  bestiaryBannerVariant: number
}

const Template = ({ children, bestiaryBannerVariant }: ComponentProps) => {
  const routes = useRoutes()

  return (
    <Main bestiaryBannerVariant={bestiaryBannerVariant}>
      <SubHeader navItems={routes} />
      <main className="pb-6">{children}</main>
    </Main>
  )
}

export default memo(Template)
