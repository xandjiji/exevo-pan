import { memo, useMemo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { generateTagColors } from 'utils'
import { blogTags } from 'Constants'
import { TagProps } from './types'

const { tagById, fallbackColor } = blogTags

const Tag = ({
  clickable = false,
  active = false,
  tagId,
  tagColor,
  style,
  className,
  children,
  ...props
}: TagProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const colors = useMemo(
    () =>
      tagColor
        ? generateTagColors(tagColor)
        : tagById[tagId as string] ?? fallbackColor,
    [tagColor, tagId],
  )

  const content =
    children ?? common.BlogTags[tagById[tagId as string]?.id] ?? tagId

  if (clickable)
    return (
      <button
        type="button"
        role="switch"
        aria-checked={active}
        className={clsx(
          'w-fit rounded-[9px] py-[6px] px-4 font-bold transition-all',
          'clickable',
          className,
        )}
        style={{
          ...style,
          backgroundColor: active
            ? colors.background.active
            : colors.background.inactive,
          color: active ? colors.text.active : colors.text.inactive,
        }}
        {...(props as JSX.IntrinsicElements['button'])}
      >
        {content}
      </button>
    )

  return (
    <div
      className={clsx(
        'w-fit rounded-[9px] py-[6px] px-4 font-bold transition-all',
        className,
      )}
      style={{
        ...style,
        backgroundColor: colors.background.active,
        color: colors.text.active,
      }}
      {...(props as JSX.IntrinsicElements['div'])}
    >
      {content}
    </div>
  )
}

export default memo(Tag)
