import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { useOnScreen } from 'hooks'
import { AnchorIcon } from 'assets/svgs'
import { h2 as H2 } from '../Headings/index'
import { useCurrentSection } from '../../../../contexts/useCurrentSection'
import { CopyToClipboard } from './utils'
import { generateSectionId } from '../../../../utils'

const HeadingSection = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { common } = useTranslations()

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
      className="mt-3 flex w-fit items-center justify-start gap-4"
    >
      <H2 {...props} id={anchorId} className="flex-grow">
        {children}
      </H2>
      <a
        href={`#${anchorId}`}
        onClick={() => CopyToClipboard(anchorId)}
        className="block h-9 w-9 shrink-0"
      >
        <AnchorIcon
          aria-label={common.AnchorIconLabel}
          className="fill-separator hover:fill-primary clickable m-0 h-full w-full cursor-pointer rounded p-0.5 transition-all"
        />
      </a>
    </div>
  )
}

export default HeadingSection
