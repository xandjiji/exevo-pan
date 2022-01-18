import { useState } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { CopyToClipboard } from './utils'
import * as S from './styles'
import { generateSectionId } from '../../../utils'

const Section = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const [anchorId] = useState(generateSectionId(children as string))

  return (
    <S.Wrapper>
      <S.Heading {...props} id={anchorId}>
        {children}
      </S.Heading>
      <S.Link href={`#${anchorId}`} onClick={() => CopyToClipboard(anchorId)}>
        <S.AnchorIcon aria-label={common.AnchorIconLabel} />
      </S.Link>
    </S.Wrapper>
  )
}

export default Section
