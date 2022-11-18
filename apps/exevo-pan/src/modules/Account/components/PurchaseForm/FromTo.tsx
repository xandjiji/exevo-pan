import clsx from 'clsx'
import { Text, CopyButton } from 'components/Atoms'

// eslint-disable-next-line react/require-default-props
type FromToProps = { from?: string; to: string } & JSX.IntrinsicElements['span']

const FromTo = ({ from, to, className, ...props }: FromToProps) => (
  <span className={clsx(className, 'my-2 flex items-center gap-1')} {...props}>
    Transfer
    {from ? (
      <>
        {' '}
        from <strong>{from}</strong>{' '}
      </>
    ) : null}
    <Text.Transfer currency="tc" amount={250} className="mx-1.5" />
    <a
      className="text-primaryHighlight font-bold"
      href="https://www.tibia.com/community/?name=Ksu"
      target="_blank"
      rel="noreferrer external"
    >
      {to}
    </a>
    <CopyButton copyString={to} />
  </span>
)

export default FromTo
