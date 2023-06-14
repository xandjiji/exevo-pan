import { createContext, useContext } from 'react'
import * as translationFiles from 'locales'

type TranslationsContextValues = {
  [File in keyof typeof translationFiles]: typeof translationFiles[File]['en']
}

const TranslationsContext = createContext<TranslationsContextValues>(
  {} as TranslationsContextValues,
)

export const TranslationsProvider = TranslationsContext.Provider

export const useTranslations = (): TranslationsContextValues =>
  useContext(TranslationsContext)

export const templateMessage = (
  message: string,
  template: Record<string, JSX.Element>,
): JSX.Element => {
  let messageTail = message
  const templatedElements: JSX.Element[] = []

  Object.entries(template).forEach(([key, jsx]) => {
    const [prefix, tail] = messageTail.split(`{{${key}}}`)
    templatedElements.push(<>{prefix}</>)
    templatedElements.push(jsx)
    messageTail = tail
  })

  if (messageTail) templatedElements.push(<>{messageTail}</>)

  return <>{templatedElements}</>
}

export const templateString = (
  message: string,
  template: Record<string, string | number>,
): string => {
  let messageTail = message
  const templatedStrings: Array<string | number> = []

  Object.entries(template).forEach(([key, string]) => {
    const [prefix, tail] = messageTail.split(`{{${key}}}`)
    templatedStrings.push(prefix)
    templatedStrings.push(string)
    messageTail = tail
  })

  if (messageTail) templatedStrings.push(messageTail)

  return templatedStrings.join('')
}
