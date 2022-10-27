import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { Chip } from 'components/Atoms'
import { SpecialTagsProps } from './types'

const SpecialTags = ({ character, className, ...props }: SpecialTagsProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const { tags } = character

  const readableTags: string[] = useMemo(
    () => tags.map((tag) => common.SpecialTags[tag]).filter(Boolean),
    [common, tags],
  )

  if (readableTags.length === 0) return null

  return (
    <div className={clsx('flex flex-wrap gap-2', className)} {...props}>
      {readableTags.map((tag) => (
        <Chip key={tag}>{common.SpecialTags[tag] ?? tag}</Chip>
      ))}
    </div>
  )
}

export default SpecialTags
