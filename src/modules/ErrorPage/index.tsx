import ErrorState from './ErrorState'

const ErrorPage = (): JSX.Element => (
  <ErrorState title="404" paragraphs={['oops!', 'page not found']} />
)

export default ErrorPage
