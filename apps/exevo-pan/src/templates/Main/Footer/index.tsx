import { useTranslations } from 'contexts/useTranslation'
import UnlicenseIcon from 'assets/svgs/unlicense.svg'
import GithubIcon from 'assets/svgs/github.svg'
import { links, routes } from 'Constants'
import * as S from './styles'

const Footer = () => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <footer className="bg-primary text-onPrimary inner-container relative z-[71] py-6 text-xs tracking-wider transition-colors">
      <nav className="inner-container">
        <ul className="flex flex-wrap items-center justify-center gap-3">
          <S.ListItem>
            <S.ListLink href={routes.HOME}>
              {common.Header.nav.currentAuctions}
            </S.ListLink>
          </S.ListItem>
          <S.ListItem>
            <S.ListLink href={routes.BAZAAR_HISTORY}>
              {common.Header.nav.bazaarHistory}
            </S.ListLink>
          </S.ListItem>
          <S.ListItem>
            <S.ListLink href={routes.STATISTICS}>
              {common.Header.nav.statistics}
            </S.ListLink>
          </S.ListItem>
          <S.ListItem>
            <S.ListLink href={routes.ADVERTISE}>
              {common.Header.nav.advertise}
            </S.ListLink>
          </S.ListItem>
          <S.ListItem>
            <S.ListLink href={routes.BLOG}>{common.Header.nav.blog}</S.ListLink>
          </S.ListItem>
          <S.ListItem>
            <S.ListLink href={routes.ABOUT}>
              {common.Header.nav.about}
            </S.ListLink>
          </S.ListItem>
        </ul>
      </nav>

      <div className="mt-5 flex items-center justify-center">
        <UnlicenseIcon
          aria-label="Unlicensed"
          className="fill-onPrimary mx-1 h-3 w-3"
        />
        {new Date().getFullYear()} {common.FooterTitle}
        <S.Link className="ml-1" href={links.GITHUB_PROFILE} rel="author">
          xandjiji
        </S.Link>
        .
        <S.Link
          className="ml-2"
          href={links.GITHUB_REPOSITORY}
          title={common.RepoLinkText}
        >
          <GithubIcon className="fill-onPrimary clickable rounded-full" />
        </S.Link>
      </div>
    </footer>
  )
}

export default Footer
