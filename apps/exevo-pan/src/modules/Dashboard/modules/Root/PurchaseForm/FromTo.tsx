import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { CharacterLink, CopyButton, Text } from 'components/Atoms'
import { capitalizeFirstLetter } from 'utils'

type FromToProps = {
  from?: string
  to: string
  tc: number
} & JSX.IntrinsicElements['span']

const FromTo = ({
  from,
  to,
  tc,
  className,
  children,
  ...props
}: FromToProps) => {
  const { common } = useTranslations()
  return (
    <span
      className={clsx(className, 'my-2 flex items-center gap-1 text-center')}
      {...props}
    >
      {capitalizeFirstLetter(common.transfer)}
      {from ? (
        <>
          {' '}
          {common.from} <strong>{from}</strong>{' '}
        </>
      ) : null}
      <Text.Transfer currency="tc" amount={tc} className="mx-1.5" />
      <CharacterLink nickname={to} className="text-primaryHighlight font-bold">
        {to}
      </CharacterLink>
      <CopyButton copyString={to} />

      {children}
    </span>
  )
}

export default FromTo
