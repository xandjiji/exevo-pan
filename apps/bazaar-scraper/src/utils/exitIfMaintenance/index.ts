import { broadcast } from 'logging'

export const exitIfMaintenance = (maintenanceCheck: () => boolean): void => {
  if (maintenanceCheck()) {
    broadcast('Server is on maintenance, exiting gracefully...', 'control')
    process.exit()
  }
}
