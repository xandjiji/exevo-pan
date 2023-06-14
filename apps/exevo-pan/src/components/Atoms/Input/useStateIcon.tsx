import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import { ValidIcon, InvalidIcon } from 'assets/svgs'
import styles from './styles.module.css'
import { StateIcon } from './types'

export const useStateIcon = (state: StateIcon) => {
  const { common } = useTranslations()

  return useMemo(
    (): Record<StateIcon, React.ReactNode> => ({
      valid: (
        <ValidIcon
          aria-label={common.InputIconLabels.valid}
          className={clsx('animate-rollIn fill-green', styles.icon)}
        />
      ),
      invalid: (
        <InvalidIcon
          aria-label={common.InputIconLabels.invalid}
          className={clsx('fill-red animate-fadeIn', styles.icon)}
        />
      ),
      neutral: null,
      loading: (
        <div
          role="alert"
          aria-label={common.InputIconLabels.loading}
          className={clsx('loading-spinner shrink-0', styles.icon)}
        />
      ),
    }),
    [common],
  )[state]
}
