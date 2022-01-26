import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'
import { ButtonProps } from './types'

const Button = ({
  children,
  loading,
  disabled,
  ...props
}: ButtonProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()
  return (
    <S.Button
      {...props}
      data-loading={loading}
      disabled={loading ? true : disabled}
    >
      {loading ? (
        <S.LoadingState role="alert" aria-label={common.LoadingLabel} />
      ) : (
        children
      )}
    </S.Button>
  )
}

export default Button
