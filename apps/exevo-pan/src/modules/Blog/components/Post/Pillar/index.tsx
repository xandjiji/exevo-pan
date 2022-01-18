import { useEffect } from 'react'
import { useCurrentSection } from '../../../contexts/useCurrentSection'
import { generateSectionId } from '../../../utils'
import { debouncedScrollIntoView, generateNavId } from './utils'
import * as S from './styles'
import { PillarProps } from './types'

const Pillar = ({ titles, ...props }: PillarProps): JSX.Element => {
  const { currentSection } = useCurrentSection()

  useEffect(() => {
    if (currentSection) {
      debouncedScrollIntoView(currentSection.title)
    }
  }, [currentSection?.title])

  return (
    <S.Nav {...props}>
      <S.MainTitle>Índice</S.MainTitle>

      <S.Ul>
        {titles.map((title) => (
          <S.Li
            id={generateNavId(title)}
            aria-current={
              currentSection && currentSection.title === title
                ? 'step'
                : undefined
            }
            key={title}
          >
            <a href={`#${generateSectionId(title)}`}>{title}</a>
          </S.Li>
        ))}
      </S.Ul>
    </S.Nav>
  )
}

export default Pillar
