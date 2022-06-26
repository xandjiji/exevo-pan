export type UseTimeInputProps = {
  min: number
  max: number
  onFinish: () => void
}

export type ValueState = {
  value: string
  buffer: string
}

export type HasNextValueArgs = {
  min: number
  max: number
  buffer: string
}
