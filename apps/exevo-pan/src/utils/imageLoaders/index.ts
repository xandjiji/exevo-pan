export const loadThumbnail = (src: string, size?: number) => {
  if (!size) return src

  const [path, extension] = src.split('.')
  return `${path}-${size}.${extension}`
}

export const loadRawSrc = (src: string) => `https://www.exevopan.com${src}`
