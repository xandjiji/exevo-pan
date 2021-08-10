import { memo } from 'react'
import * as S from './styles'

const DrawerFooter = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <S.Wrapper {...props}>
    <S.RepositoryLink
      href="https://github.com/xandjiji/exevo-pan"
      target="_blank"
      rel="noreferrer"
    >
      <S.GithubIcon />
      Go to this repository
    </S.RepositoryLink>
    made by
    <S.ProfileLink
      href="https://github.com/xandjiji"
      target="_blank"
      rel="noreferrer"
    >
      xandjiji
    </S.ProfileLink>
  </S.Wrapper>
)

export default memo(DrawerFooter)
