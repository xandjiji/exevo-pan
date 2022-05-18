import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import clsx from 'clsx'
import { Chip } from 'components/Atoms'
import { getCharacterTags } from './utils'
import { SpecialTagsProps } from './types'

const SpecialTags = ({ character, className, ...props }: SpecialTagsProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const tags = useMemo(() => getCharacterTags(character), [character])

  if (tags.length === 0) return null

  return (
    <div className={clsx('flex flex-wrap gap-2', className)} {...props}>
      {tags.map((tag) => (
        <Chip key={tag}>{common.CharacterCard.SpecialTags[tag] ?? tag}</Chip>
      ))}
    </div>
  )
}

export default SpecialTags
