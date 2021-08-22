import * as S from './styles'
import { SectionProps } from '../../types'

const Pillar = ({ sections }: { sections: SectionProps[] }): JSX.Element => (
  <S.Aside>
    <S.Nav>
      <S.Title>Contents</S.Title>
      <S.Ul>
        {sections.map((sectionItem) => (
          <S.Li>
            <a key={sectionItem.id} href={`#${sectionItem.id}`}>
              {sectionItem.title}
            </a>
          </S.Li>
        ))}
      </S.Ul>
    </S.Nav>
  </S.Aside>
)

export default Pillar
