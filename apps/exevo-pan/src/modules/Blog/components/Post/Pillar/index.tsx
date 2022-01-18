import { generateSectionId } from '../../../utils'
import * as S from './styles'
import { PillarProps } from './types'

const Pillar = ({ titles, ...props }: PillarProps): JSX.Element => {
  console.log(titles)

  return (
    <S.Nav {...props}>
      <S.MainTitle>Índice</S.MainTitle>

      <S.Ul>
        {titles.map((title) => (
          <S.Li>
            <a href={`#${generateSectionId(title.trim())}`}>{title}</a>
          </S.Li>
        ))}
      </S.Ul>
    </S.Nav>
  )
}

export default Pillar
