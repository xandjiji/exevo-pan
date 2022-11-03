import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { Chip } from 'components/Atoms'
import { SpecialTagsProps } from './types'

const SpecialTags = ({
  character: { tags },
  className,
  ...props
}: SpecialTagsProps) => {
  const {
    translations: { common },
  } = useTranslations()

  if (tags.length === 0) return null

  return (
    <div className={clsx('flex flex-wrap gap-2', className)} {...props}>
      {tags.map((tag) => (
        <Chip key={tag}>{common.SpecialTags[tag] ?? tag}</Chip>
      ))}
    </div>
  )
}

export default SpecialTags
