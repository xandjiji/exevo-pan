import { useTranslations } from 'contexts/useTranslation'
import Link from 'next/link'
import { routes } from 'Constants'
import * as S from './styles'
import { ErrorStateProps } from './types'

const ErrorState = ({ title, paragraphs }: ErrorStateProps): JSX.Element => {
  const {
    translations: { error, common },
  } = useTranslations()

  return (
    <S.Wrapper>
      <S.Top>
        <S.Title>{title}</S.Title>
      </S.Top>
      <S.Bottom>
        <S.ErrorIcon role="alert" aria-label={error.ErrorLabel} />
        {paragraphs?.map((p) => (
          <S.Paragraph key={p}>{p}</S.Paragraph>
        ))}

        <S.Nav>
          <S.Ul>
            <S.Li>
              <Link href={routes.HOME}>
                <S.A>{common.Header.nav.currentAuctions}</S.A>
              </Link>
            </S.Li>
            <S.Li>
              <Link href={routes.BAZAAR_HISTORY}>
                <S.A>{common.Header.nav.bazaarHistory}</S.A>
              </Link>
            </S.Li>
            <S.Li>
              <Link href={routes.LIBERTABRA_WAR}>
                <S.A>{common.Header.nav.war}</S.A>
              </Link>
            </S.Li>
            <S.Li>
              <Link href={routes.STATISTICS}>
                <S.A>{common.Header.nav.statistics}</S.A>
              </Link>
            </S.Li>
            <S.Li>
              <Link href={routes.ABOUT}>
                <S.A>{common.Header.nav.about}</S.A>
              </Link>
            </S.Li>
          </S.Ul>
        </S.Nav>
      </S.Bottom>
    </S.Wrapper>
  )
}

export default ErrorState
