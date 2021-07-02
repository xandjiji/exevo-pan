import * as S from './styles'
import { LabeledTextBoxProps } from './types'

const LabeledTextBox = ({
  children,
  labelText,
  warning,
  ...props
}: LabeledTextBoxProps): JSX.Element => {
  return (
    <S.Wrapper warning={warning} {...props}>
      {labelText && (
        <S.Label>
          {labelText}
          {warning && <S.WarningIcon title="Warning!" />}
        </S.Label>
      )}
      {children}
    </S.Wrapper>
  )
}

export default LabeledTextBox
