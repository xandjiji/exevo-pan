/* eslint-disable react/no-danger */
import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { CheckIcon } from 'assets/svgs'

const Heading = ({ className, ...props }: JSX.IntrinsicElements['p']) => (
  <p
    className={clsx(
      className,
      'flex flex-wrap items-center justify-center gap-2',
    )}
    {...props}
  />
)

const Li = ({ className, children, ...props }: JSX.IntrinsicElements['li']) => (
  <li className={clsx('flex items-center gap-1', className)} {...props}>
    <CheckIcon className="fill-greenHighlight shrink-0" />
    {children}
  </li>
)

const Pitch = () => {
  const {
    translations: { account },
  } = useTranslations()

  return (
    <div className="grid place-items-center gap-8">
      <div className="grid place-items-center gap-2">
        <Heading>
          {account.Pitch.upgradeNow}{' '}
          <strong className="text-primaryHighlight text-2xl tracking-wider">
            Exevo Pro 🧙‍♂️
          </strong>
        </Heading>
        <p>{account.Pitch.exclusiveFeatures}</p>
      </div>

      <div className="text-tsm grid gap-4">
        <ul className="grid gap-2">
          <Li>{account.Pitch.features.tcInvested}</Li>
          <Li>
            <span
              dangerouslySetInnerHTML={{
                __html: account.Pitch.features.auctionFilters,
              }}
            />
          </Li>
          <Li>
            <span
              dangerouslySetInnerHTML={{
                __html: account.Pitch.features.bossTracker,
              }}
            />
          </Li>
        </ul>
        <p className="text-right">{account.Pitch.more}</p>
      </div>

      <Heading>
        {account.Pitch.payOnce}{' '}
        <strong className="text-2xl">{account.Pitch.forever} 🙌</strong>
      </Heading>
    </div>
  )
}

export default memo(Pitch)
