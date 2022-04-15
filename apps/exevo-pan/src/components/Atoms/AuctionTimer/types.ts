import { HTMLAttributes } from 'react'

export interface AuctionTimerProps extends HTMLAttributes<HTMLSpanElement> {
  endDate: Date
  past?: boolean
}

export interface CountdownObject {
  timeDiff: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export type CountdownProps = {
  endingSoon?: boolean
} & JSX.IntrinsicElements['span']
