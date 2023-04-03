import { useState, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ClientComponent } from 'components/Organisms'
import { Link, Switch, CtaButton } from 'components/Atoms'
import NextLink from 'next/link'
import { useTheme } from 'contexts/useTheme'
import { routes } from 'Constants'
import { ExevoPanIcon, MoonIcon } from 'assets/svgs'
import MenuButton from './MenuButton'
import HeaderIcon from './HeaderIcon'
import LanguagePicker from './LanguagePicker'
import AccountButton from './AccountButton'
import { NavItems } from './routes'
import { HeaderProps } from './types'

const heading = {
  [routes.HOME]: 'home',
  [routes.BOSSES.TRACKER]: 'bossTracker',
  [routes.CALCULATORS]: 'calculators',
  [routes.STATISTICS]: 'statistics',
  [routes.HIGHSCORES]: 'highscores',
  [routes.ADVERTISE]: 'advertise',
  [routes.LIBERTABRA_WAR]: 'war',
  [routes.BLOG]: 'blog',
  [routes.ABOUT]: 'about',
}

const Header = ({ clean = false, className, ...props }: HeaderProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const [menuOpen, setMenuOpen] = useState(false)

  const { theme, toggleTheme } = useTheme()
  const { pathname } = useRouter()

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [])

  const pageTitle = heading[pathname]
    ? common.Header.h1[heading[pathname]]
    : null

  const accessibleLogoName = heading[pathname]
    ? common.Header.h1[heading[pathname]]
    : 'Exevo Pan'

  return (
    <>
      <header
        className={clsx(
          'z-75 inner-container custom-scrollbar from-primary sticky top-0 flex h-[60px] w-full items-center justify-between to-transparent shadow-md transition-colors md:overflow-x-auto md:after:block',
          clean
            ? 'bg-background'
            : 'bg-primary after:z-1 after:pointer-events-none after:fixed after:top-0 after:right-0 after:hidden after:h-[60px] after:w-8 after:bg-gradient-to-l',
          className,
        )}
        {...props}
      >
        <nav className="mr-6 flex shrink-0 items-center">
          {!clean && (
            <MenuButton
              aria-checked={menuOpen}
              aria-label={
                common.Header[menuOpen ? 'closeMenuLabel' : 'openMenuLabel']
              }
              onClick={toggleMenu}
            />
          )}

          <NextLink href={routes.HOME} aria-label={accessibleLogoName}>
            <div
              className={clsx(
                'mr-4 shrink-0 cursor-pointer items-center justify-center md:flex',
                clean ? 'flex' : 'hidden',
              )}
            >
              {pageTitle && <h1 className="hidden">{pageTitle}</h1>}
              <ExevoPanIcon
                width={36}
                height={36}
                aria-label={common.Header.logoLabel}
              />
            </div>
          </NextLink>

          {!clean && (
            <ul
              className={clsx(
                menuOpen ? 'left-0' : '-left-full opacity-0',
                'bg-darkerPrimary absolute top-full left-0 grid auto-cols-min gap-1 rounded-br-md p-5 shadow-md transition-all md:static md:flex md:items-center md:rounded-none md:bg-transparent md:p-0 md:opacity-100 md:shadow-none',
              )}
            >
              {NavItems.map(({ title, href, exact, icon }) => (
                <li key={title}>
                  <Link
                    className="clickable currentpage:shadow-inner flex items-center rounded-lg py-2 px-3"
                    href={href}
                    exact={exact}
                  >
                    <HeaderIcon icon={icon} spaced />
                    <h2 className="text-s text-onPrimary whitespace-nowrap font-normal tracking-wider">
                      {common.Header.nav[title]}
                    </h2>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <LanguagePicker variant={clean ? 'onSurface' : 'onPrimary'} />
          <ClientComponent>
            <Switch
              active={theme === 'dark'}
              onClick={toggleTheme}
              icon={<MoonIcon />}
              aria-label={common.Header.themeSwitch}
            />
          </ClientComponent>
          {!clean && <CtaButton />}
          <AccountButton variant={clean ? 'onSurface' : 'onPrimary'} />
        </div>
      </header>

      <button
        className={clsx(
          'z-74 bg-backdrop fixed top-0 left-0 h-screen w-screen transition-opacity md:hidden',
          !menuOpen && 'pointer-events-none opacity-0',
        )}
        type="button"
        aria-hidden={!menuOpen}
        aria-label={common.Header.closeMenuLabel}
        onClick={toggleMenu}
        tabIndex={-1}
      />
    </>
  )
}

export default Header
