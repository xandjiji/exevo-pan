import { TimeObject } from './types'

export const SEPARATOR = ':'
export const EMPTY_VALUE = '--'
export const EMPTY_TIME = `${EMPTY_VALUE}${SEPARATOR}${EMPTY_VALUE}`

export const value2TimeObject = (value = EMPTY_TIME): TimeObject => {
  const [hours, minutes] = value.split(SEPARATOR)
  return { hours, minutes, value }
}

export const formatValue = (value: string, maxLength = 2): string =>
  value ? value.padStart(maxLength, '0') : EMPTY_VALUE

export const buildTime = (hours: string, minutes: string, maxLength = 2) =>
  `${formatValue(hours, maxLength)}${SEPARATOR}${formatValue(minutes)}`
