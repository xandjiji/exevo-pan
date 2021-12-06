import { useMemo } from 'react'
import { Chip } from 'components/Atoms'
import { getCharacterTags } from './utils'
import { Wrapper } from './styles'
import { SpecialTagsProps } from './types'

const SpecialTags = ({ character }: SpecialTagsProps): JSX.Element | null => {
  const tags = useMemo(() => getCharacterTags(character), [character])

  if (tags.length === 0) return null

  return (
    <Wrapper>
      {tags.map((tag) => (
        <Chip key={tag}>{tag}</Chip>
      ))}
    </Wrapper>
  )
}

export default SpecialTags
