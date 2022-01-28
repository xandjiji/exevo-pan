import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { useOnScreen } from 'hooks'
import { useCurrentSection } from '../../../../contexts/useCurrentSection'
import { CopyToClipboard } from './utils'
import * as S from './styles'
import { generateSectionId } from '../../../../utils'

const HeadingSection = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const [anchorId] = useState(generateSectionId(children as string))

  const elementRef = useRef<HTMLDivElement>()
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
    <S.Wrapper ref={elementRef as React.RefObject<HTMLDivElement>}>
      <S.Heading {...props} id={anchorId}>
        {children}
      </S.Heading>
      <S.Link href={`#${anchorId}`} onClick={() => CopyToClipboard(anchorId)}>
        <S.AnchorIcon aria-label={common.AnchorIconLabel} />
      </S.Link>
    </S.Wrapper>
  )
}

export default HeadingSection
