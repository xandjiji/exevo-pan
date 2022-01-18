import { useCurrentSection } from '../../../contexts/useCurrentSection'
import { generateSectionId } from '../../../utils'
import * as S from './styles'
import { PillarProps } from './types'

const Pillar = ({ titles, ...props }: PillarProps): JSX.Element => {
  const { currentSection } = useCurrentSection()

  return (
    <S.Nav {...props}>
      <S.MainTitle>Índice</S.MainTitle>

      <S.Ul>
        {titles.map((title) => (
          <S.Li
            aria-current={
              currentSection && currentSection.title === title
                ? 'step'
                : undefined
            }
            key={title}
          >
            <a href={`#${generateSectionId(title.trim())}`}>{title}</a>
          </S.Li>
        ))}
      </S.Ul>
    </S.Nav>
  )
}

export default Pillar
