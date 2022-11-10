import { logger } from './Logger'

export * from './TrackETA'
export * from './Timer'
export { coloredText, coloredProgress, coloredDiff, brackets } from './utils'

export const { log, broadcast, tabBroadcast, setFooterText } = logger
