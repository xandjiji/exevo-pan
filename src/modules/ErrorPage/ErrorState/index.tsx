import { routes } from 'Constants'
import * as S from './styles'
import { ErrorStateProps } from './types'

const ErrorState = ({ title, paragraphs }: ErrorStateProps): JSX.Element => (
  <S.Wrapper>
    <S.Top>
      <S.Title>{title}</S.Title>
    </S.Top>
    <S.Bottom>
      <S.ErrorIcon />
      {paragraphs?.map(p => (
        <S.Paragraph key={p}>{p}</S.Paragraph>
      ))}

      <S.Nav>
        <S.Ul>
          <S.Li>
            <S.Navigation to={routes.HOME}>Current Auctions</S.Navigation>
          </S.Li>
          <S.Li>
            <S.Navigation to={routes.BAZAAR_HISTORY}>
              Bazaar History
            </S.Navigation>
          </S.Li>
          <S.Li>
            <S.Navigation to={routes.STATISTICS}>Statistics</S.Navigation>
          </S.Li>
        </S.Ul>
      </S.Nav>
    </S.Bottom>
  </S.Wrapper>
)

export default ErrorState
