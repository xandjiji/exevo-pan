import { Tooltip } from 'components/Organisms'
import * as S from './styles'
import { CharacterImbuementsProps } from './types'

const highlightedImbuements = {
  'Critical Hit': true,
  'Life Leech': true,
  'Mana Leech': true,
  'Magic Level': true,
  'Sword Skill': true,
  'Axe Skill': true,
  'Club Skill': true,
  'Distance Skill': true,
} as Record<string, boolean>

const CharacterImbuements = ({
  imbuements,
  ...props
}: CharacterImbuementsProps): JSX.Element =>
  imbuements.length ? (
    <Tooltip
      aria-label="Imbuements list"
      content={imbuements.map(imbuement => (
        <S.Imbuement
          key={imbuement}
          highlight={highlightedImbuements[imbuement]}
        >
          {imbuement}
        </S.Imbuement>
      ))}
    >
      <S.Wrapper {...props}>
        <S.Icon />
        {`Imbuements: ${imbuements.length}/23`}
      </S.Wrapper>
    </Tooltip>
  ) : (
    <S.Wrapper {...props}>
      <S.Icon />
      {'Imbuements: 0/23'}
    </S.Wrapper>
  )

export default CharacterImbuements
