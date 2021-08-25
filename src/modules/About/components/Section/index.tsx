import { useTranslation } from 'next-i18next'
import * as S from './styles'
import { CopyToClipboard } from './utils'
import { SectionProps } from './types'

const Section = ({
  id,
  title,
  children,
  ...props
}: SectionProps): JSX.Element => {
  const { t } = useTranslation('about')

  return (
    <S.Section id={id} {...props}>
      <S.Title>
        <a href={`#${id}`}>{t(`${title}.title`)}</a>
        <S.AnchorIcon onClick={() => CopyToClipboard(id)} />
      </S.Title>
      {children}
    </S.Section>
  )
}

export default Section
