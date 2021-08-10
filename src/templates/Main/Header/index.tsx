import { routes } from 'Constants'
import { CtaButton, Switch } from 'components/Atoms/'
import { useTheme } from 'contexts/useTheme'
import * as S from './styles'

const Header = (): JSX.Element => {
  const { currentTheme, toggleTheme } = useTheme()

  return (
    <S.Wrapper>
      <S.Nav>
        <S.LogoNavigation
          to={routes.HOME}
          aria-current="false"
          aria-label="Go to homepage"
        >
          <S.ExevoPanLogo />
        </S.LogoNavigation>
        <S.Ul>
          <S.Li>
            <S.Navigation to={routes.HOME} exact>
              <S.MarketIcon />
              Current Auctions
            </S.Navigation>
          </S.Li>
          <S.Li>
            <S.Navigation to={routes.BAZAAR_HISTORY}>
              <S.HistoryIcon />
              Bazaar History
            </S.Navigation>
          </S.Li>
          <S.Li>
            <S.Navigation to={routes.STATISTICS}>
              <S.StatisticsIcon />
              Statistics
            </S.Navigation>
          </S.Li>
        </S.Ul>
      </S.Nav>

      <S.RightWrapper>
        <Switch
          active={currentTheme === 'dark-theme'}
          onClick={toggleTheme}
          icon={<S.MoonIcon />}
          aria-label="Toggle dark theme"
        />
        <CtaButton />
      </S.RightWrapper>
    </S.Wrapper>
  )
}

export default Header
