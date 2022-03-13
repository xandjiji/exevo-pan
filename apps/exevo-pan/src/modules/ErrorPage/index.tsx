import { useTranslations } from 'contexts/useTranslation'
import ErrorState from './ErrorState'

const ErrorPage = (): JSX.Element => {
  const {
    translations: { error },
  } = useTranslations()

  return <ErrorState title="404" paragraphs={[error.P1, error.P2]} />
}

export default ErrorPage
