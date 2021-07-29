import { useEffect } from 'react'
import ErrorPageComponent from 'components/ErrorPage'

const ErrorPage = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Exevo Pan - 404'
  }, [])

  return (
    <ErrorPageComponent
      mainMessage="404"
      paragraphs={['oops!', 'page not found']}
    />
  )
}

export default ErrorPage
