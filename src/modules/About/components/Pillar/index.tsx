import * as S from './styles'
import { PillarProps } from './types'

const Pillar = ({ sections, highlightedId }: PillarProps): JSX.Element => (
  <S.Aside>
    <S.Nav>
      <S.Title>Contents</S.Title>
      <S.Ul>
        {sections.map((sectionItem) => (
          <S.Li
            key={sectionItem.id}
            aria-current={
              highlightedId && highlightedId === sectionItem.id
                ? 'step'
                : undefined
            }
          >
            <a href={`#${sectionItem.id}`}>{sectionItem.title}</a>
          </S.Li>
        ))}
      </S.Ul>
    </S.Nav>
  </S.Aside>
)

export default Pillar
