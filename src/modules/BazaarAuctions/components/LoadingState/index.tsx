import { useTranslations } from 'contexts/useTranslation'
import { LoadingAlert } from 'components/Atoms'
import { useAuctions } from '../../contexts/useAuctions'
import { LoadingStateProps } from './types'

const LoadingState = ({ children }: LoadingStateProps): JSX.Element => {
  const { loading } = useAuctions()
  const {
    translations: { bazaarHistory },
  } = useTranslations()

  return (
    <>
      {loading && <LoadingAlert>{bazaarHistory.LoadingState}</LoadingAlert>}
      {children}
    </>
  )
}

export default LoadingState
