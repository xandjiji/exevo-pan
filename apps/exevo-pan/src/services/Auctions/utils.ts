export const buildHeaders = (): Headers => {
  const headers = new Headers()

  headers.set('Content-Type', 'application/json')
  headers.set('Bypass-Tunnel-Reminder', 'true')

  return headers
}
