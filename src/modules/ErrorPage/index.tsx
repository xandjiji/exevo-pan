import { useTranslation } from 'next-i18next'
import ErrorState from './ErrorState'

const ErrorPage = (): JSX.Element => {
  const { t } = useTranslation('404')

  return <ErrorState title="404" paragraphs={[t('P1'), t('P2')]} />
}

export default ErrorPage
