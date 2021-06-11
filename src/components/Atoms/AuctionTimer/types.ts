import { HTMLAttributes } from 'react'

export interface AuctionTimerProps {
  endDate: Date
  props?: HTMLAttributes<HTMLSpanElement>
}

export interface CountdownObject {
  timeDiff: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface CountdownProps {
  endingSoon?: boolean
}
