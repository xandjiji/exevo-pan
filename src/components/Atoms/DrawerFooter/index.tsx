import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { links } from 'Constants'
import * as S from './styles'

const DrawerFooter = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <S.Wrapper {...props}>
      <S.RepositoryLink
        href={links.GITHUB_REPOSITORY}
        target="_blank"
        rel="noreferrer noopener external"
      >
        <S.GithubIcon />
        {common.RepoLinkText}
      </S.RepositoryLink>
      {common.MadeBy}
      <S.ProfileLink
        href={links.GITHUB_PROFILE}
        target="_blank"
        rel="noopener noreferrer author external"
      >
        xandjiji
      </S.ProfileLink>
    </S.Wrapper>
  )
}

export default memo(DrawerFooter)
