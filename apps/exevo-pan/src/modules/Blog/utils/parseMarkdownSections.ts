type Parser = (value: string) => string

const HEX_BASE = 16

/* parsing emojis */
const emojiRegex = new RegExp(/\\\\u{[\dA-F]{5}}/g)
const emojiUnicodeGroup = new RegExp(/\\\\u{(.*)}/)
const decodeEmoji = (text: string) =>
  text.replace(emojiUnicodeGroup, (_, group) =>
    String.fromCodePoint(parseInt(group, HEX_BASE)),
  )

const parseEmojis: Parser = (text: string) =>
  text.replace(emojiRegex, (match) => decodeEmoji(match))

/* parsing ASCII encoded characters */
const ASCIIRegex = new RegExp(/\\\\x[\dA-F]{2}/g)
const decodeASCII = (text: string) => {
  const hexString = text.replace(/\\\\/g, '')
  return String.fromCodePoint(+`0${hexString}`)
}

const parseASCIICharacters: Parser = (text: string) =>
  text.replace(ASCIIRegex, (match) => decodeASCII(match))

/* parsing UNICODE encoded characters */
const unicodeRegex = new RegExp(/\\\\u[\dA-F]{4}/g)
const unicodeGroup = new RegExp(/\\\\u(.*)/)
const decodeUnicodes = (text: string) =>
  text.replace(unicodeGroup, (_, group) =>
    String.fromCodePoint(parseInt(group, HEX_BASE)),
  )

const parseUnicode: Parser = (text: string) =>
  text.replace(unicodeRegex, (match) => decodeUnicodes(match))

export const parseMarkdownSections = (src: string): string[] =>
  src
    .split('),mdx(')
    .filter((value) => value.includes('\\"h2\\"'))
    .map((value) => {
      const [, , , title] = value.split('\\"')
      return parseUnicode(parseASCIICharacters(parseEmojis(title)))
    })
