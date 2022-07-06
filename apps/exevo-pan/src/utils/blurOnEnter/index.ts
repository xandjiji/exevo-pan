export const blurOnEnter: React.KeyboardEventHandler<HTMLInputElement> = (
  e,
) => {
  if (e.key === 'Enter') e.currentTarget.blur()
}
