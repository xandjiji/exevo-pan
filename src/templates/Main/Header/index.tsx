import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { Link, Switch } from 'components/Atoms/'
import { useTheme } from 'contexts/useTheme'
import NextLink from 'next/link'
import { routes } from 'Constants'
import LanguagePicker from './LanguagePicker'
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

  const { currentTheme, toggleTheme } = useTheme()
  const { pathname } = useRouter()

  return (
    <S.Wrapper {...props}>
      <S.Nav>
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
        <S.Ul>
          <S.Li>
            <Link href={routes.HOME} exact>
              <S.A>
                <S.MarketIcon />
                <S.H2>{common.Header.nav.currentAuctions}</S.H2>
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.BAZAAR_HISTORY}>
              <S.A>
                <S.HistoryIcon />
                <S.H2>{common.Header.nav.bazaarHistory}</S.H2>
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.STATISTICS}>
              <S.A>
                <S.StatisticsIcon />
                <S.H2>{common.Header.nav.statistics}</S.H2>
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.LIBERTABRA_WAR}>
              <S.A>
                <S.WarIcon />
                <S.H2>Libertabra War</S.H2>
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.ADVERTISE}>
              <S.A>
                <S.AdvertiseIcon />
                <S.H2>{common.Header.nav.advertise}</S.H2>
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.ABOUT}>
              <S.A>
                <S.AboutIcon />
                <S.H2>{common.Header.nav.about}</S.H2>
              </S.A>
            </Link>
          </S.Li>
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
        {/* <CtaButton /> */}
      </S.RightWrapper>
    </S.Wrapper>
  )
}

export default Header
