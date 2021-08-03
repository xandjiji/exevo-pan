import { routes } from 'Constants'
import { CtaButton, Switch } from 'components/Atoms/'
import { useTheme } from 'contexts/useTheme'
import * as S from './styles'

const Header = (): JSX.Element => {
  const { currentTheme, toggleTheme } = useTheme()

  return (
    <S.Wrapper>
      <S.Nav>
        <S.ExevoPanLogo />
        <S.Ul>
          <S.Li>
            <S.Navigation to={routes.HOME} exact>
              Current Auctions
            </S.Navigation>
          </S.Li>
          <S.Li>
            <S.Navigation to={routes.BAZAAR_HISTORY} exact>
              Bazaar History
            </S.Navigation>
          </S.Li>
          <S.Li>
            <S.Navigation to={routes.STATISTICS} exact>
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
