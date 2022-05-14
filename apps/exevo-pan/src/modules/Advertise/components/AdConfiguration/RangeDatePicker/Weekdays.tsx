import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'

const Weekdays = () => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6].map((weekday) => (
        <span
          key={common.FullWeekdays[weekday]}
          aria-label={common.FullWeekdays[weekday]}
          className="text-separator mb-1.5"
        >
          {common.Weekdays[weekday][0]}
        </span>
      ))}
    </>
  )
}

export default memo(Weekdays)
