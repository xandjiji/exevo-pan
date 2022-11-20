import { useState, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ClientComponent } from 'components/Organisms'
import { Link, Switch, CtaButton, TibiaBlackjack } from 'components/Atoms'
import NextLink from 'next/link'
import { useTheme } from 'contexts/useTheme'
import { routes } from 'Constants'
import { ExevoPanIcon, MoonIcon } from 'assets/svgs'
import MenuButton from './MenuButton'
import HeaderIcon from './HeaderIcon'
import LanguagePicker from './LanguagePicker'
import AccountButton from './AccountButton'
import { NavItems } from './routes'

const heading = {
  [routes.HOME]: 'home',
  [routes.BOSS_TRACKER]: 'bossTracker',
  [routes.CALCULATORS]: 'calculators',
  [routes.STATISTICS]: 'statistics',
  [routes.HIGHSCORES]: 'highscores',
  [routes.ADVERTISE]: 'advertise',
  [routes.LIBERTABRA_WAR]: 'war',
  [routes.BLOG]: 'blog',
  [routes.ABOUT]: 'about',
}

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const {
    translations: { common },
  } = useTranslations()

  const [menuOpen, setMenuOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  const { theme, toggleTheme } = useTheme()
  const { pathname } = useRouter()

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [])

  const pageTitle = heading[pathname]
    ? common.Header.h1[heading[pathname]]
    : null

  const shouldMenuOverlap = menuOpen || languageOpen

  const accessibleLogoName = heading[pathname]
    ? common.Header.h1[heading[pathname]]
    : 'Exevo Pan'

  return (
    <>
      <header
        className={clsx(
          'bg-primary inner-container custom-scrollbar after:z-1 from-primary sticky top-0 flex h-[60px] w-full items-center justify-between overflow-x-auto to-transparent shadow-md transition-colors after:pointer-events-none after:fixed after:top-0 after:right-0 after:hidden after:h-[60px] after:w-8 after:bg-gradient-to-l md:after:block',
          className,
        )}
        style={{ zIndex: shouldMenuOverlap ? 75 : 71 }}
        {...props}
      >
        <nav className="mr-6 flex shrink-0 items-center">
          <MenuButton
            aria-checked={menuOpen}
            aria-label={
              common.Header[menuOpen ? 'closeMenuLabel' : 'openMenuLabel']
            }
            onClick={toggleMenu}
          />

          <NextLink href={routes.HOME} aria-label={accessibleLogoName}>
            <div className="mr-4 hidden shrink-0 cursor-pointer items-center justify-center md:flex">
              {pageTitle && <h1 className="hidden">{pageTitle}</h1>}
              <ExevoPanIcon
                width={36}
                height={36}
                aria-label={common.Header.logoLabel}
              />
            </div>
          </NextLink>

          <ul
            className={clsx(
              menuOpen ? 'left-0' : '-left-full opacity-0',
              'bg-darkerPrimary fixed top-[60px] left-0 grid auto-cols-min gap-1 rounded-br-md p-5 shadow-md transition-all md:static md:flex md:items-center md:rounded-none md:bg-transparent md:p-0 md:opacity-100 md:shadow-none',
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
        </nav>

        <div className="flex items-center gap-4">
          <LanguagePicker
            isOpen={languageOpen}
            setLanguageOpen={setLanguageOpen}
          />
          <ClientComponent>
            <Switch
              active={theme === 'dark'}
              onClick={toggleTheme}
              icon={<MoonIcon />}
              aria-label={common.Header.themeSwitch}
            />
          </ClientComponent>
          <CtaButton />
          <AccountButton />
          <TibiaBlackjack.FloatingButton className="md:hidden" />
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
