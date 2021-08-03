import { routes } from 'Constants'
import * as S from './styles'

const Header = (): JSX.Element => {
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
    </S.Wrapper>
  )
}

export default Header
