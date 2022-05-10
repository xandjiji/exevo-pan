import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { useOnScreen } from 'hooks'
import AnchorIcon from 'assets/svgs/anchor.svg'
import { useCurrentSection } from '../../../../contexts/useCurrentSection'
import { CopyToClipboard } from './utils'
import { generateSectionId } from '../../../../utils'

const HeadingSection = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  const {
    translations: { common },
  } = useTranslations()

  const [anchorId] = useState(generateSectionId(children as string))

  const elementRef = useRef<HTMLDivElement>(null)
  const onScreen = useOnScreen(elementRef)

  const { setSectionStatus } = useCurrentSection()

  useEffect(() => {
    setSectionStatus({
      title: children?.toString() ?? '',
      status: onScreen,
      offset: elementRef.current?.offsetTop ?? 0,
    })
  }, [onScreen, setSectionStatus])

  return (
    <div
      ref={elementRef}
      className="flex w-fit items-center justify-start gap-4"
    >
      <h2 {...props} id={anchorId} className="flex-grow">
        {children}
      </h2>
      <a
        href={`#${anchorId}`}
        onClick={() => CopyToClipboard(anchorId)}
        className="block h-9 w-9 shrink-0"
      >
        <AnchorIcon
          aria-label={common.AnchorIconLabel}
          className="fill-separator hover:fill-primary clickable m-0 h-full w-full cursor-pointer rounded p-[2px] transition-all"
        />
      </a>
    </div>
  )
}

export default HeadingSection
