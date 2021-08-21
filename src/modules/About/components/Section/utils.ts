export const CopyToClipboard = (id: string): void => {
  const { clipboard } = navigator
  if (clipboard) {
    clipboard.writeText(
      `https://${window.location.hostname}${window.location.pathname}#${id}`,
    )
  }
}
