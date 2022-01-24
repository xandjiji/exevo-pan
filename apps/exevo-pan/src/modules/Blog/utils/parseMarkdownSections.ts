type Parser = (value: string) => string

const HEX_BASE = 16

/* parsing emojis */
const emojiRegex = new RegExp(/\\\\u{[\dA-F]{5}}/g)
const unicodeGroup = new RegExp(/\\\\u{(.*)}/)
const decodeEmoji = (text: string) =>
  text.replace(unicodeGroup, (_, group) =>
    String.fromCodePoint(parseInt(group, HEX_BASE)),
  )

const parseEmojis: Parser = (text: string) =>
  text.replace(emojiRegex, (match) => decodeEmoji(match))

/* parsing encoded characters */
const encodedCharacterRegex = new RegExp(/\\\\x[\dA-F]{2}/g)
const decodeHex = (text: string) => {
  const hexString = text.replace(/\\\\/g, '')
  return String.fromCodePoint(+`0${hexString}`)
}

const parseCharacters: Parser = (text: string) =>
  text.replace(encodedCharacterRegex, (match) => decodeHex(match))

export const parseMarkdownSections = (src: string): string[] =>
  src
    .split('),mdx(')
    .filter((value) => value.includes('\\"h2\\"'))
    .map((value) => {
      const [, , , title] = value.split('\\"')
      return parseCharacters(parseEmojis(title))
    })
