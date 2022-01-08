/* eslint-disable no-irregular-whitespace */
export const sanitizeHtmlString = (html: string): string => {
  const sanitizedHtml = html.replace(/ /g, ' ')

  return sanitizedHtml
}
