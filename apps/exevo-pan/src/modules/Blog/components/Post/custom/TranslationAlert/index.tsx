import { useTranslations } from 'contexts/useTranslation'

const TranslationAlert = (): JSX.Element => {
  const { translations: blog } = useTranslations()

  return (
    <code>
      {blog.TranslationAlert.content}{' '}
      <a href="/dasdsada">{blog.TranslationAlert.link}</a>
    </code>
  )
}

export default TranslationAlert
