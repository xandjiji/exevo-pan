import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'
import { CopyToClipboard } from './utils'
import { SectionProps } from './types'

const Section = ({
  id,
  title,
  children,
  ...props
}: SectionProps): JSX.Element => {
  const {
    translations: { about, common },
  } = useTranslations()

  return (
    <S.Section id={id} {...props}>
      <S.Title>
        <a href={`#${id}`}>{about[title].title}</a>
        <S.AnchorIcon
          aria-label={common.AnchorIconLabel}
          onClick={() => CopyToClipboard(id)}
        />
      </S.Title>
      {children}
    </S.Section>
  )
}

export default Section
