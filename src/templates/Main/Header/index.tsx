import { routes } from 'Constants'
import NextLink from 'next/link'
import { Link, CtaButton, Switch } from 'components/Atoms/'
import { useTheme } from 'contexts/useTheme'
import * as S from './styles'

const Header = (): JSX.Element => {
  const { currentTheme, toggleTheme } = useTheme()

  return (
    <S.Wrapper>
      <S.Nav>
        <S.LogoWrapper>
          <NextLink href={routes.HOME}>
            <S.ExevoPanLogo priority aria-label="Go to homepage" />
          </NextLink>
        </S.LogoWrapper>
        <S.Ul>
          <S.Li>
            <Link href={routes.HOME}>
              <S.A>
                <S.MarketIcon />
                Current Auctions
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.BAZAAR_HISTORY}>
              <S.A>
                <S.HistoryIcon />
                Bazaar History
              </S.A>
            </Link>
          </S.Li>
          <S.Li>
            <Link href={routes.STATISTICS}>
              <S.A>
                <S.StatisticsIcon />
                Statistics
              </S.A>
            </Link>
          </S.Li>
        </S.Ul>
      </S.Nav>

      <S.RightWrapper suppressHydrationWarning={true}>
        {process.browser && (
          <Switch
            active={currentTheme === 'dark-theme'}
            onClick={toggleTheme}
            icon={<S.MoonIcon />}
            aria-label="Toggle dark theme"
          />
        )}
        <CtaButton />
      </S.RightWrapper>
    </S.Wrapper>
  )
}

export default Header
