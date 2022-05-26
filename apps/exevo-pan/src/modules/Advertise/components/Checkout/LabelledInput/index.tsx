import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import { Input } from 'components/Atoms'
import ValidIcon from 'assets/svgs/valid.svg'
import InvalidIcon from 'assets/svgs/invalid.svg'
import styles from './styles.module.css'
import { LabelledInputProps, InputStates } from './types'

const LabelledInput = ({
  validationState = 'neutral',
  className,
  ...props
}: LabelledInputProps) => {
  const {
    translations: { advertise },
  } = useTranslations()

  const StateIcon: Record<InputStates, React.ReactNode> = useMemo(
    () => ({
      valid: (
        <ValidIcon
          aria-label={advertise.Checkout.LabelledInput.valid}
          className={clsx('animate-rollIn fill-green', styles.icon)}
        />
      ),
      invalid: (
        <InvalidIcon
          aria-label={advertise.Checkout.LabelledInput.invalid}
          className={clsx('fill-red', styles.icon)}
        />
      ),
      neutral: (
        <InvalidIcon aria-hidden className={clsx('fill-red', styles.icon)} />
      ),
      loading: (
        <div
          aria-label={advertise.Checkout.LabelledInput.loading}
          className={clsx('loading-spinner after:bg-surface', styles.icon)}
        />
      ),
    }),
    [advertise],
  )

  const isValid = validationState === 'valid'

  return (
    <div className="relative">
      <Input
        className={clsx('', styles.input, isValid && styles.valid, className)}
        {...props}
      />
      {StateIcon[validationState]}
    </div>
  )
}

export default LabelledInput
export type { InputStates }
