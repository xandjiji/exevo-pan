export type KeyboardModifiers = {
  shiftKey?: boolean
  ctrlKey?: boolean
}

export type ArrowControls = {
  inc: (modifiers?: KeyboardModifiers) => void
  dec: (modifiers?: KeyboardModifiers) => void
}

export type AssertKeyboardProps = {
  min: number
  max: number
  step: number
}
