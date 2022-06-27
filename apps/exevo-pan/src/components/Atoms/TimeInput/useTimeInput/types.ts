export type UseTimeInputProps = {
  min: number
  max: number
  onInferredValue: () => void
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
