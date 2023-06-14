import { useTranslations } from 'contexts/useTranslation'
import { links } from 'Constants'
import { blockquote as Blockquote } from '../../Style/Blockquote'
import { ExternalLink } from '../Links'

const TranslationAlert = () => {
  const { blog } = useTranslations()

  return (
    <Blockquote>
      {blog.TranslationAlert.content}{' '}
      <strong>
        <ExternalLink href={links.I18N}>
          {blog.TranslationAlert.link}
        </ExternalLink>
      </strong>{' '}
      😄
    </Blockquote>
  )
}

export default TranslationAlert
