/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Link, Switch, CtaButton } from 'components/Atoms/'
import NextLink from 'next/link'
import { useTheme } from 'contexts/useTheme'
import { routes } from 'Constants'
import Logo from 'assets/logo.png'
import ThemeIcon from 'assets/svgs/moon.svg'
import MenuButton from './MenuButton'
import HeaderIcon from './HeaderIcon'
import LanguagePicker from './LanguagePicker'
import { NavItems } from './routes'

const heading = {
  [routes.HOME]: 'home',
  [routes.BAZAAR_HISTORY]: 'bazaarHistory',
  [routes.STATISTICS]: 'statistics',
  [routes.HIGHSCORES]: 'highscores',
  [routes.LIBERTABRA_WAR]: 'war',
  [routes.ADVERTISE]: 'advertise',
}

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
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
          'bg-primary inner-container custom-scrollbar after:z-1 from-primary sticky top-0 flex h-[60px] w-full items-center justify-between overflow-x-auto to-transparent shadow-md transition-colors after:pointer-events-none after:fixed after:top-0 after:right-0 after:hidden after:h-[60px] after:w-8 after:bg-gradient-to-tl md:after:block',
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

          <NextLink href={routes.HOME}>
            <a aria-label={accessibleLogoName}>
              <div className="mr-4 hidden shrink-0 cursor-pointer items-center justify-center md:flex">
                {pageTitle && <h1 className="hidden">{pageTitle}</h1>}
                <Image
                  unoptimized
                  aria-label={common.Header.logoLabel}
                  alt={accessibleLogoName}
                  src={Logo}
                />
              </div>
            </a>
          </NextLink>

          <ul
            className={clsx(
              'bg-darkerPrimary fixed top-[60px] left-0 grid auto-cols-min gap-4 rounded-b-md p-5 shadow-md transition-opacity md:static md:flex md:transform-none md:items-center md:rounded-none md:bg-transparent md:p-0 md:opacity-100 md:shadow-none',
              !menuOpen && 'opacity-0',
            )}
          >
            {NavItems.map(({ title, href, exact, icon }) => (
              <li key={title}>
                <Link
                  className="clickable currentpage:shadow-inner flex items-center rounded-lg py-2 px-4"
                  href={href}
                  exact={exact}
                >
                  <>
                    <HeaderIcon icon={icon} spaced />
                    <h2 className="text-s text-onPrimary whitespace-nowrap font-normal tracking-wider">
                      {common.Header.nav[title]}
                    </h2>
                  </>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4" suppressHydrationWarning>
          <LanguagePicker
            isOpen={languageOpen}
            setLanguageOpen={setLanguageOpen}
          />
          {process.browser && (
            <Switch
              active={theme === 'dark'}
              onClick={toggleTheme}
              icon={<ThemeIcon />}
              aria-label={common.Header.themeSwitch}
            />
          )}
          <CtaButton />
        </div>
      </header>

      <button
        className={clsx(
          'z-74 fixed top-0 left-0 h-screen w-screen bg-black/50 transition-opacity md:hidden',
          !menuOpen && 'pointer-events-none opacity-0',
        )}
        type="button"
        aria-hidden={!menuOpen}
        aria-label={common.Header.closeMenuLabel}
        onClick={toggleMenu}
      />
    </>
  )
}

export default Header
