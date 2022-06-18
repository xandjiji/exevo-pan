import { isServer } from 'utils'

const ClientComponent = ({
  children,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div {...props}>{!isServer() && children}</div>
)

export default ClientComponent
