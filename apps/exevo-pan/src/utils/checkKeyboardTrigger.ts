export const keyboardTriggerCodes = ['Enter', 'NumpadEnter', 'Space']

export const checkKeyboardTrigger = (code: string): boolean =>
  keyboardTriggerCodes.includes(code)
