import { memo } from 'react'
import { Link } from 'components/Atoms'
import { routes } from 'Constants'
import * as S from './styles'

const Header = (): JSX.Element => (
  <S.Nav>
    <S.Ul>
      <S.Li>
        <Link href={routes.STATISTICS} exact>
          <S.A>
            <S.OverallIcon />
            <S.H3>Overall</S.H3>
          </S.A>
        </Link>
      </S.Li>
      <S.Li>
        <Link href={routes.HIGHSCORES} exact>
          <S.A>
            <S.HighscoresIcon />
            <S.H3>Highscores</S.H3>
          </S.A>
        </Link>
      </S.Li>
    </S.Ul>
  </S.Nav>
)

export default memo(Header)
