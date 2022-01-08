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
    translations: { about },
  } = useTranslations()

  return (
    <S.Section id={id} {...props}>
      <S.Title>
        <a href={`#${id}`}>{about[title].title}</a>
        <S.AnchorIcon
          aria-label={about.AnchorIconLabel}
          onClick={() => CopyToClipboard(id)}
        />
      </S.Title>
      {children}
    </S.Section>
  )
}

export default Section
