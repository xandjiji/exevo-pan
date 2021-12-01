import { imbuement } from 'DataDictionary/dictionaries'
import { buildOption } from './utils'

export const imbuementOptions = imbuement.tokens.map(buildOption)
