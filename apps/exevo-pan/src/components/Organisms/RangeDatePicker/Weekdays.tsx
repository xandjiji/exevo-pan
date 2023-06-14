import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'

const Weekdays = () => {
  const { common } = useTranslations()

  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6].map((weekday) => (
        <span
          key={
            common.FullWeekdays[
              weekday as unknown as keyof typeof common.FullWeekdays
            ]
          }
          aria-label={
            common.FullWeekdays[
              weekday as unknown as keyof typeof common.FullWeekdays
            ]
          }
          className="text-separator mb-1.5"
        >
          {
            common.Weekdays[
              weekday as unknown as keyof typeof common.Weekdays
            ][0]
          }
        </span>
      ))}
    </>
  )
}

export default memo(Weekdays)
