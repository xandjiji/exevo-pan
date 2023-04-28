import { memo } from 'react'
import clsx from 'clsx'
import { Main, SubHeader, Hero } from 'templates'
import { useRoutes } from '../routes'

type ComponentProps = {
  children: React.ReactNode
  currentRoute: string
  mainPage?: boolean
  className?: string
}

const Template = ({
  currentRoute,
  mainPage = false,
  children,
  className,
}: ComponentProps) => {
  const { list, getRoute } = useRoutes()
  const foundRoute = getRoute(currentRoute)

  return (
    <Main>
      <SubHeader navItems={list} />
      {!!foundRoute && (
        <Hero offset title={foundRoute.title} src={foundRoute.hero} />
      )}
      <main
        className={clsx(
          mainPage ? 'z-1' : 'inner-container z-1 pt-4 pb-8 md:pt-0',
          className,
        )}
      >
        {children}
      </main>
    </Main>
  )
}

export default memo(Template)
