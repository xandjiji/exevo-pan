import { useEffect } from 'react'
import ErrorState from './ErrorState'

const ErrorPage = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Exevo Pan - 404'
  }, [])

  return <ErrorState title="404" paragraphs={['oops!', 'page not found']} />
}

export default ErrorPage
