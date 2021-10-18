export const copyToClipboard = (value: string): void => {
  const { clipboard } = navigator
  if (clipboard) {
    clipboard.writeText(`${value}`)
  }
}
