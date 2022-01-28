export const generateSectionId = (title: string): string =>
  title
    .toString()
    .replace(/\s/g, '-')
    .split('-')
    .map((token) => token.replace(/\W/g, ''))
    .join('-')
