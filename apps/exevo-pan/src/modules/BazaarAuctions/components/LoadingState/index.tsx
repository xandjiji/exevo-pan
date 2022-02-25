import { useTranslations } from 'contexts/useTranslation'
import { LoadingAlert } from 'components/Atoms'
import { useAuctions } from '../../contexts/useAuctions'
import { LoadingStateProps } from './types'

const LoadingState = ({ children }: LoadingStateProps): JSX.Element => {
  const { loading } = useAuctions()
  const {
    translations: { common },
  } = useTranslations()

  return (
    <>
      {loading && <LoadingAlert>{common.LoadingState}</LoadingAlert>}
      {children}
    </>
  )
}

export default LoadingState
