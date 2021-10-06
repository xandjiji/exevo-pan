import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import styled from 'styled-components'

const Weekday = styled.span`
  margin-bottom: 6px;
  color: var(--separator);
`

const Weekdays = (): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6].map((weekday) => (
        <Weekday
          key={common.FullWeekdays[weekday]}
          aria-label={common.FullWeekdays[weekday]}
        >
          {common.Weekdays[weekday][0]}
        </Weekday>
      ))}
    </>
  )
}

export default memo(Weekdays)
