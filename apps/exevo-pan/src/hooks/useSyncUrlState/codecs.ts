export const defaultDecode = <T>(value: string, defaultValue: T): T => {
  if (typeof defaultValue === 'number') {
    return Number(value) as unknown as T
  }
  if (typeof defaultValue === 'boolean') {
    return (value === 'true') as unknown as T
  }

  return decodeURIComponent(value) as unknown as T
}

export const defaultEncode = <T>(value: T): string => {
  if (typeof value === 'number') return value.toString()
  if (typeof value === 'boolean') value.toString()

  return encodeURIComponent(value as unknown as string)
}
