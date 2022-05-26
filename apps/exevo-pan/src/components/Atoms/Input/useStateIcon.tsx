import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import ValidIcon from 'assets/svgs/valid.svg'
import InvalidIcon from 'assets/svgs/invalid.svg'
import { StateIcon } from './types'

export const useStateIcon = (state: StateIcon) => {
  const {
    translations: { common },
  } = useTranslations()

  return useMemo(
    (): Record<StateIcon, React.ReactNode> => ({
      valid: (
        <ValidIcon
          aria-label={common.InputIconLabels.valid}
          className="animate-rollIn fill-green"
        />
      ),
      invalid: (
        <InvalidIcon
          aria-label={common.InputIconLabels.invalid}
          className="fill-red"
        />
      ),
      neutral: null,
      loading: (
        <div
          aria-label={common.InputIconLabels.loading}
          className="loading-spinner after:bg-surface"
        />
      ),
    }),
    [common],
  )[state]
}
