type KeyAction = Record<string, () => void>

export type UseTimeInputProps = {
  defaultValue: string
  controlledValue?: string
  min: number
  max: number
  onInferredValue?: () => void
  onDoubleBackspace?: () => void
  onKey?: KeyAction
}

export type CanInferValueArgs = {
  min: number
  max: number
  buffer: string
}
