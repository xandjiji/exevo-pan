import { useTranslations } from 'contexts/useTranslation'
import { links } from 'Constants'
import { ExternalLink } from '../Links'

const TranslationAlert = () => {
  const {
    translations: { blog },
  } = useTranslations()

  return (
    <blockquote>
      {blog.TranslationAlert.content}{' '}
      <strong>
        <ExternalLink href={links.I18N}>
          {blog.TranslationAlert.link}
        </ExternalLink>
      </strong>{' '}
      😄
    </blockquote>
  )
}

export default TranslationAlert
