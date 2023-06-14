import { useMemo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { isObjectEmpty } from 'utils'
import { Chip, ChipWrapper, Empty } from '../atoms'
import { secondsToTimeObject } from './utils'
import styles from '../styles.module.css'
import { BubbleProps, TimeBubblesProps } from './types'

const Bubble = ({ time, children, className, ...props }: BubbleProps) => (
  <div
    className={clsx(
      'flex flex-col items-center gap-1 font-light',
      styles.hidden,
      className,
    )}
    {...props}
  >
    <Chip>{time}</Chip>
    <small>{children}</small>
  </div>
)

const TimeBubbles = ({ seconds, className, ...props }: TimeBubblesProps) => {
  const { common, calculators } = useTranslations()

  const timeObject = useMemo(() => secondsToTimeObject(seconds), [seconds])

  return (
    <ChipWrapper className={clsx('flex-wrap', className)} {...props}>
      <Bubble time={timeObject.days} aria-hidden={!timeObject.days}>
        {common[timeObject.days > 1 ? 'days' : 'day']}
      </Bubble>
      <Bubble time={timeObject.hours} aria-hidden={!timeObject.hours}>
        {common[timeObject.hours > 1 ? 'hours' : 'hour']}
      </Bubble>
      <Bubble time={timeObject.minutes} aria-hidden={!timeObject.minutes}>
        {common[timeObject.minutes > 1 ? 'minutes' : 'minute']}
      </Bubble>
      <Empty aria-hidden={!isObjectEmpty(timeObject)}>{calculators.none}</Empty>
    </ChipWrapper>
  )
}

export default TimeBubbles
