import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation('common')

  const { current: labelId } = useRef(uuidv4())
  return (
    <S.Wrapper
      aria-labelledby={labelText ? labelId : undefined}
      warning={warning}
      {...props}
    >
      {labelText && (
        <S.Label id={labelId}>
          {labelText}
          {warning && <S.WarningIcon title={t('WarningLabel')} />}
        </S.Label>
      )}
      {children}
    </S.Wrapper>
  )
}

export default LabeledTextBox
