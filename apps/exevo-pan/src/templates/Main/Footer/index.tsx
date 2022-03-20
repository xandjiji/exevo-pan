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
      <S.Nav>
        <S.Ul>
          <S.Li>
            <NextLink href={routes.HOME}>
              {common.Header.nav.currentAuctions}
            </NextLink>
          </S.Li>
          <S.Li>
            <NextLink href={routes.BAZAAR_HISTORY}>
              {common.Header.nav.bazaarHistory}
            </NextLink>
          </S.Li>
          <S.Li>
            <NextLink href={routes.STATISTICS}>
              {common.Header.nav.statistics}
            </NextLink>
          </S.Li>
          <S.Li>
            <NextLink href={routes.ADVERTISE}>
              {common.Header.nav.advertise}
            </NextLink>
          </S.Li>
          <S.Li>
            <NextLink href={routes.BLOG}>{common.Header.nav.blog}</NextLink>
          </S.Li>
          <S.Li>
            <NextLink href={routes.ABOUT}>{common.Header.nav.about}</NextLink>
          </S.Li>
        </S.Ul>
      </S.Nav>
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
        <a
          href={links.GITHUB_REPOSITORY}
          target="_blank"
          rel="noreferrer noopener external"
          title={common.RepoLinkText}
          style={{ marginLeft: 8 }}
        >
          <S.GithubIcon />
        </a>
      </S.Title>
    </S.Wrapper>
  )
}

export default Footer
