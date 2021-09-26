import styled from 'styled-components'
import { Input } from 'components/Atoms'
import { InputProps } from 'components/Atoms/Input/types'

interface LabelledInputProps extends InputProps {
  id: string
  labelText: string
}

export const Wrapper = styled.div``

export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
`

const LabelledInput = ({
  id,
  labelText,
  ...props
}: LabelledInputProps): JSX.Element => (
  <Wrapper>
    <Label htmlFor={id}>{labelText}</Label>
    <Input id={id} {...props} />
  </Wrapper>
)

export default LabelledInput
