type KeyAction = Record<string, () => void>

export type UseTimeInputProps = {
  min: number
  max: number
  onInferredValue?: () => void
  onKey?: KeyAction
}

export type CanInferValueArgs = {
  min: number
  max: number
  buffer: string
}
