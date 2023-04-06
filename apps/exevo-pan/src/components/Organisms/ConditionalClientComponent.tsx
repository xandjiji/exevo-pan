import { isServer } from 'utils'

const ConditionalClientComponent = ({
  ssr,
  children,
  ...props
}: { ssr: boolean } & JSX.IntrinsicElements['div']) =>
  ssr ? <>{children}</> : <div {...props}>{!isServer() && children}</div>

export default ConditionalClientComponent
