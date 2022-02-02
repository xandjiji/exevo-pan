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
            <>
              {navItem.icon}
              <h3>{navItem.title}</h3>
            </>
          </Link>
        </S.Li>
      ))}
    </S.Ul>
  </S.Nav>
)

export default memo(SubHeader)
