import { useTranslations } from 'contexts/useTranslation'
import { useUuid } from 'hooks'
import * as S from './styles'
import { LabeledTextBoxProps } from './types'

const LabeledTextBox = ({
  children,
  labelText,
  warning,
  ...props
}: LabeledTextBoxProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const labelId = useUuid()

  return (
    <S.Wrapper
      suppressHydrationWarning
      aria-labelledby={labelText ? labelId : undefined}
      warning={warning}
      {...props}
    >
      {labelText && (
        <S.Label suppressHydrationWarning id={labelId}>
          {labelText}
          {warning && <S.WarningIcon title={common.WarningLabel} unoptimized />}
        </S.Label>
      )}
      {children}
    </S.Wrapper>
  )
}

export default LabeledTextBox
