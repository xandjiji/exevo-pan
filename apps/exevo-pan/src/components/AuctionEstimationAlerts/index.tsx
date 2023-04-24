import { Alert } from 'components/Atoms'

/* @ ToDo: i18n */

type AlertProps = JSX.IntrinsicElements['div']

const Disclaimer = (args: AlertProps) => (
  <Alert variant="primary" noIcon {...args}>
    <p className="mb-2">
      Value is always <strong>subjective</strong>!
    </p>

    <p>This estimation only considers:</p>

    <ul className="marker:text-primaryHighlight grid list-inside list-disc">
      <li>Server type</li>
      <li>Skills, level and vocation</li>
      <li>Charm points</li>
    </ul>
  </Alert>
)

const Failed = (args: AlertProps) => (
  <Alert variant="alert" {...args}>
    Not many similar characters were found in our database
  </Alert>
)

export default { Disclaimer, Failed }
