import { coloredText } from 'logging'

export const printFilename = (filename: string): string =>
  coloredText(filename, 'highlight')
