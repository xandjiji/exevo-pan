import { useTranslations } from 'contexts/useTranslation'
import ErrorState from './ErrorState'

const ErrorPage = () => {
  const { common } = useTranslations()

  return (
    <ErrorState title="404" paragraphs={[common.error.P1, common.error.P2]} />
  )
}

export default ErrorPage
