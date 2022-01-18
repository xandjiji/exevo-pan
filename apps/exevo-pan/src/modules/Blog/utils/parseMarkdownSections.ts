const HEX_BASE = 16

const emojiRegex = new RegExp(/\\\\u{[\dA-F]{5}}/g)
const unicodeGroup = new RegExp(/\\\\u{(.*)}/)

const unicodeToChar = (text: string) =>
  text.replace(unicodeGroup, (_, group) =>
    String.fromCodePoint(parseInt(group, HEX_BASE)),
  )

const parseEmojis = (text: string) =>
  text.replace(emojiRegex, (match) => unicodeToChar(match))

export const parseMarkdownSections = (src: string): string[] =>
  src
    .split('),mdx(')
    .filter((value) => value.includes('\\"h2\\"'))
    .map((value) => {
      const [, , , title] = value.split('\\"')
      return parseEmojis(title)
    })
