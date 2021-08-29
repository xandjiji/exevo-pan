import { useRouter } from 'next/router'
import { Link, Switch } from 'components/Atoms/'
import { useTheme } from 'contexts/useTheme'
import NextLink from 'next/link'
import { routes } from 'Constants'
import * as S from './styles'

const heading = {
  [routes.HOME]: 'Buy and sell Tibia characters on the official Char Bazaar!',
  [routes.BAZAAR_HISTORY]: 'Explore through Tibia Char Bazaar history data!',
  [routes.STATISTICS]: 'Find statistics for Tibia Char Bazaar characters!',
  [routes.HIGHSCORES]:
    'Top levels, highest skills and biggests bids on Tibia Char Bazzar!',
  [routes.LIBERTABRA_WAR]:
    'Follow live data and statistics from Libertabra War!',
}

const Header = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const { currentTheme, toggleTheme } = useTheme()
  const { pathname } = useRouter()

  return (
    <S.Wrapper {...props}>
      <S.Nav>
        <NextLink href={routes.HOME}>
          <S.LogoWrapper>
            <S.H1>{heading[pathname] ?? 'Exevo Pan'}</S.H1>
            <S.ExevoPanLogo
              priority
              aria-label="Go to homepage"
              alt={heading[pathname] ?? 'Exevo Pan'}
            />
          </S.LogoWrapper>
        </NextLink>
        <S.Ul>
          <S.Li>
            <Link href={routes.HOME} exact>
              <S.A>
                <S.MarketIcon />
                <S.H2>Current Auctions</S.H2>
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.BAZAAR_HISTORY}>
              <S.A>
                <S.HistoryIcon />
                <S.H2>Bazaar History</S.H2>
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.STATISTICS}>
              <S.A>
                <S.StatisticsIcon />
                <S.H2>Statistics</S.H2>
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
            <Link href={routes.ABOUT}>
              <S.A>
                <S.AboutIcon />
                <S.H2>About</S.H2>
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
            aria-label="Toggle dark theme"
          />
        )}
        {/* <CtaButton /> */}
      </S.RightWrapper>
    </S.Wrapper>
  )
}

export default Header
