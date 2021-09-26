import LabelledInput from '../LabelledInput'

const EmailInput = (): JSX.Element => (
  <LabelledInput
    id="email-input"
    labelText="Email"
    placeholder="you@email.com"
    allowClear
  />
)

export default EmailInput
