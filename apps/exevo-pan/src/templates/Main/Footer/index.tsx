import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import { links, routes } from 'Constants'
import * as S from './styles'

const Footer = (): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <S.Wrapper>
      <S.Title>
        <S.UnlicenseIcon aria-label="Unlicensed" />
        {new Date().getFullYear()} {common.FooterTitle}
        <a
          href={links.GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer author external"
          style={{ marginLeft: 3 }}
        >
          xandjiji
        </a>
        .
      </S.Title>

      <S.Nav>
        <S.Ul>
          <S.Li>
            <NextLink href={routes.HOME}>
              <S.A>{common.Header.nav.currentAuctions}</S.A>
            </NextLink>
          </S.Li>
          <S.Li>
            <NextLink href={routes.BAZAAR_HISTORY}>
              <S.A>{common.Header.nav.bazaarHistory}</S.A>
            </NextLink>
          </S.Li>
          <S.Li>
            <NextLink href={routes.STATISTICS}>
              <S.A>{common.Header.nav.statistics}</S.A>
            </NextLink>
          </S.Li>
          <S.Li>
            <NextLink href={routes.ADVERTISE}>
              <S.A>{common.Header.nav.advertise}</S.A>
            </NextLink>
          </S.Li>
          <S.Li>
            <NextLink href={routes.BLOG}>
              <S.A>{common.Header.nav.blog}</S.A>
            </NextLink>
          </S.Li>
          <S.Li>
            <NextLink href={routes.ABOUT}>
              <S.A>{common.Header.nav.about}</S.A>
            </NextLink>
          </S.Li>
        </S.Ul>
      </S.Nav>
    </S.Wrapper>
  )
}

export default Footer
