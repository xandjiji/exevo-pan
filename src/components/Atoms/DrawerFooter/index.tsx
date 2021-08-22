import { memo } from 'react'
import { links } from 'Constants'
import * as S from './styles'

const DrawerFooter = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <S.Wrapper {...props}>
    <S.RepositoryLink
      href={links.GITHUB_REPOSITORY}
      target="_blank"
      rel="noreferrer"
    >
      <S.GithubIcon />
      Go to this repository
    </S.RepositoryLink>
    made by
    <S.ProfileLink href={links.GITHUB_PROFILE} target="_blank" rel="noreferrer">
      xandjiji
    </S.ProfileLink>
  </S.Wrapper>
)

export default memo(DrawerFooter)
