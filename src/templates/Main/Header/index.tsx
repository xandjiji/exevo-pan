import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Link, CtaButton, Switch } from 'components/Atoms/'
import { useTheme } from 'contexts/useTheme'
import NextLink from 'next/link'
import { routes } from 'Constants'
import * as S from './styles'

const heading = {
  [routes.HOME]: 'home',
  [routes.BAZAAR_HISTORY]: 'bazaarHistory',
  [routes.STATISTICS]: 'statistics',
  [routes.HIGHSCORES]: 'highscores',
  [routes.ABOUT]: 'about',
}

const Header = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const { t } = useTranslation()

  const { currentTheme, toggleTheme } = useTheme()
  const { pathname } = useRouter()

  return (
    <S.Wrapper {...props}>
      <S.Nav>
        <NextLink href={routes.HOME}>
          <S.LogoWrapper>
            <S.H1>
              {heading[pathname]
                ? t(`Header.H1.${heading[pathname]}`)
                : 'Exevo Pan'}
            </S.H1>
            <S.ExevoPanLogo
              priority
              aria-label={t('Header.logoLabel')}
              alt={
                heading[pathname]
                  ? t(`Header.H1.${heading[pathname]}`)
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
                <S.H2>{t('Header.nav.currentAuctions')}</S.H2>
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.BAZAAR_HISTORY}>
              <S.A>
                <S.HistoryIcon />
                <S.H2>{t('Header.nav.bazaarHistory')}</S.H2>
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.STATISTICS}>
              <S.A>
                <S.StatisticsIcon />
                <S.H2>{t('Header.nav.statistics')}</S.H2>
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.ABOUT}>
              <S.A>
                <S.AboutIcon />
                <S.H2>{t('Header.nav.about')}</S.H2>
              </S.A>
            </Link>
          </S.Li>
        </S.Ul>
      </S.Nav>

      <S.RightWrapper suppressHydrationWarning>
        {process.browser && (
          <Switch
            active={currentTheme === 'dark-theme'}
            onClick={toggleTheme}
            icon={<S.MoonIcon />}
            aria-label={t('Header.themeSwitch')}
          />
        )}
        <CtaButton />
      </S.RightWrapper>
    </S.Wrapper>
  )
}

export default Header
