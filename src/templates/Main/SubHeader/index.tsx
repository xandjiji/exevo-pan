import { memo } from 'react'
import { Link } from 'components/Atoms'
import * as S from './styles'
import { SubHeaderProps } from './types'

const SubHeader = ({ navItems, ...props }: SubHeaderProps): JSX.Element => (
  <S.Nav {...props}>
    <S.Ul>
      {navItems.map((navItem) => (
        <S.Li key={navItem.title}>
          <Link href={navItem.href} exact>
            <S.A>
              {navItem.icon}
              <S.H3>{navItem.title}</S.H3>
            </S.A>
          </Link>
        </S.Li>
      ))}
    </S.Ul>
  </S.Nav>
)

export default memo(SubHeader)
