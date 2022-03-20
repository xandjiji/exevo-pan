import { isValidElement } from 'react'

export const getNodeText = (node: React.ReactNode): string => {
  if (!node) return ''

  if (['string', 'number'].includes(typeof node)) return node.toString()

  if (node instanceof Array) return node.map(getNodeText).join('')

  if (isValidElement(node)) return getNodeText(node.props.children)

  return ''
}
