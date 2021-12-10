import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import { Chip } from 'components/Atoms'
import { getCharacterTags } from './utils'
import { Wrapper } from './styles'
import { SpecialTagsProps } from './types'

const SpecialTags = ({
  character,
  ...props
}: SpecialTagsProps): JSX.Element | null => {
  const {
    translations: { common },
  } = useTranslations()

  const tags = useMemo(() => getCharacterTags(character), [character])

  if (tags.length === 0) return null

  return (
    <Wrapper {...props}>
      {tags.map((tag) => (
        <Chip key={tag}>{common.CharacterCard.SpecialTags[tag] ?? tag}</Chip>
      ))}
    </Wrapper>
  )
}

export default SpecialTags
