import { useState, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { Link, Switch, CtaButton } from 'components/Atoms/'
import { useTheme } from 'contexts/useTheme'
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
  [routes.ABOUT]: 'about',
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

  const { currentTheme, toggleTheme } = useTheme()
  const { pathname } = useRouter()

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [])

  return (
    <>
      <S.Wrapper {...props}>
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
            <S.LogoWrapper>
              <S.H1>
                {heading[pathname]
                  ? common.Header.h1[heading[pathname]]
                  : 'Exevo Pan'}
              </S.H1>
              <S.ExevoPanLogo
                unoptimized
                priority
                aria-label={common.Header.logoLabel}
                alt={
                  heading[pathname]
                    ? common.Header.h1[heading[pathname]]
                    : 'Exevo Pan'
                }
              />
            </S.LogoWrapper>
          </NextLink>
          <S.Ul aria-expanded={menuOpen}>
            {NavItems.map(({ title, href, exact, icon }) => (
              <S.Li key={title}>
                <Link href={href} exact={exact}>
                  <S.A>
                    {icon}
                    <S.H2>{common.Header.nav[title]}</S.H2>
                  </S.A>
                </Link>
              </S.Li>
            ))}
          </S.Ul>
        </S.Nav>

        <S.RightWrapper suppressHydrationWarning>
          <LanguagePicker />
          {process.browser && (
            <Switch
              active={currentTheme === 'dark-theme'}
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
