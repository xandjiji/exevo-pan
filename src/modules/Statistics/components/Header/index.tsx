import { memo } from 'react'
import routes from '../../routes'
import * as S from './styles'

const Icons = {
  Overall: <S.OverallIcon />,
  Highscores: <S.HighscoresIcon />,
}

const Header = (): JSX.Element => (
  <S.Nav>
    <S.Ul>
      {routes.map(route => (
        <S.Li key={route.key}>
          <S.Navigation to={route.path} exact>
            {Icons[route.key]}
            {route.key}
          </S.Navigation>
        </S.Li>
      ))}
    </S.Ul>
  </S.Nav>
)

export default memo(Header)
