/* eslint-disable react/no-array-index-key */
import { memo } from 'react'
import styled from 'styled-components'

/* @ ToDo: i18n */
const weekdaysArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

/* @ ToDo: add aria-labels with full weekday name AND use it as element key */

const Weekday = styled.span`
  margin-bottom: 6px;
  color: var(--separator);
`

const Weekdays = (): JSX.Element => (
  <>
    {weekdaysArray.map((weekday, index) => (
      <Weekday key={`${weekday}-${index}`}>{weekday}</Weekday>
    ))}
  </>
)

export default memo(Weekdays)
