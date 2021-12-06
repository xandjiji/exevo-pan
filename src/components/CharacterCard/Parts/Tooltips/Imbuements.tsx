import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'DataDictionary/dictionaries/imbuement'
import * as S from './styles'
import { CharacterImbuementsProps } from './types'

const CharacterImbuements = ({
  items,
  ...props
}: CharacterImbuementsProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const characterImbuements = useMemo(
    () => new Set<string>([...items]),
    [items],
  )

  return (
    <Tooltip
      aria-label={common.CharacterCard.imbuementsListLabel}
      content={tokens.map((imbuement) => (
        <S.Item key={imbuement} active={characterImbuements.has(imbuement)}>
          {imbuement}
        </S.Item>
      ))}
    >
      <S.Wrapper {...props}>
        <S.ImbuementIcon />
        {`Imbuements: ${items.length}/23`}
      </S.Wrapper>
    </Tooltip>
  )
}

export default CharacterImbuements
