export interface AuctionTimerProps {
  endDate: Date
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
