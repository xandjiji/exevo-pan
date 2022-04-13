/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Link, Switch, CtaButton } from 'components/Atoms/'
import NextLink from 'next/link'
import { useTheme } from 'contexts/useTheme'
import { routes } from 'Constants'
import MenuButton from './MenuButton'
import LanguagePicker from './LanguagePicker'
import { NavItems } from './routes'
import * as S from './styles'

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
          shouldMenuOverlap ? 'z-75' : 'z-71',
          className,
        )}
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
              <S.LogoWrapper>
                {pageTitle && <S.H1>{pageTitle}</S.H1>}
                <S.ExevoPanLogo
                  unoptimized
                  aria-label={common.Header.logoLabel}
                  alt={accessibleLogoName}
                />
              </S.LogoWrapper>
            </a>
          </NextLink>
          <S.Ul aria-expanded={menuOpen}>
            {NavItems.map(({ title, href, exact, icon }) => (
              <S.Li key={title}>
                <Link href={href} exact={exact}>
                  <>
                    {icon}
                    <h2>{common.Header.nav[title]}</h2>
                  </>
                </Link>
              </S.Li>
            ))}
          </S.Ul>
        </nav>

        <S.RightWrapper suppressHydrationWarning>
          <LanguagePicker
            isOpen={languageOpen}
            setLanguageOpen={setLanguageOpen}
          />
          {process.browser && (
            <Switch
              active={theme === 'dark'}
              onClick={toggleTheme}
              icon={<S.MoonIcon />}
              aria-label={common.Header.themeSwitch}
            />
          )}
          <CtaButton />
        </S.RightWrapper>
      </header>
      <S.Backdrop
        aria-hidden={!menuOpen}
        aria-label={common.Header.closeMenuLabel}
        onClick={toggleMenu}
      />
    </>
  )
}

export default Header
