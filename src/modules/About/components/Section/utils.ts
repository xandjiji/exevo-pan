import { copyToClipboard } from 'utils'

export const CopyToClipboard = (id: string): void =>
  copyToClipboard(
    `https://${window.location.hostname}${window.location.pathname}#${id}`,
  )
