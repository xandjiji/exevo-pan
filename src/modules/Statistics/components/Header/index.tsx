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
            Overall
          </S.A>
        </Link>
      </S.Li>
      <S.Li>
        <Link href={routes.HIGHSCORES} exact>
          <S.A>
            <S.HighscoresIcon />
            Highscores
          </S.A>
        </Link>
      </S.Li>
    </S.Ul>
  </S.Nav>
)

export default memo(Header)
