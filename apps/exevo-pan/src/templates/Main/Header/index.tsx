/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { Link, Switch, CtaButton } from 'components/Atoms/'
import NextLink from 'next/link'
import { routes } from 'Constants'
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
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const [menuOpen, setMenuOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  const { resolvedTheme, setTheme } = useTheme()
  const { pathname } = useRouter()

  const toggleTheme = useCallback(
    () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light'),
    [resolvedTheme, setTheme],
  )

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
      <S.Wrapper data-active={shouldMenuOverlap} {...props}>
        <S.Nav>
          <S.MenuButton
            type="button"
            role="switch"
            aria-checked={menuOpen}
            aria-label={
              common.Header[menuOpen ? 'closeMenuLabel' : 'openMenuLabel']
            }
            onClick={toggleMenu}
          >
            <S.MenuIcon />
          </S.MenuButton>
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
        </S.Nav>

        <S.RightWrapper suppressHydrationWarning>
          <LanguagePicker
            isOpen={languageOpen}
            setLanguageOpen={setLanguageOpen}
          />
          {process.browser && (
            <Switch
              active={resolvedTheme === 'dark'}
              onClick={toggleTheme}
              icon={<S.MoonIcon />}
              aria-label={common.Header.themeSwitch}
            />
          )}
          <CtaButton />
        </S.RightWrapper>
      </S.Wrapper>
      <S.Backdrop
        aria-hidden={!menuOpen}
        aria-label={common.Header.closeMenuLabel}
        onClick={toggleMenu}
      />
    </>
  )
}

export default Header
