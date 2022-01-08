import { useTranslations } from 'contexts/useTranslation'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
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

  const { current: labelId } = useRef(uuidv4())
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
          {warning && <S.WarningIcon title={common.WarningLabel} />}
        </S.Label>
      )}
      {children}
    </S.Wrapper>
  )
}

export default LabeledTextBox
