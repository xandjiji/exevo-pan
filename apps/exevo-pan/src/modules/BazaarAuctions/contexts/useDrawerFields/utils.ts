export const buildOption = (value: string): Option => ({ name: value, value })

export const sortOptions = (a: Option, b: Option) =>
  a.name.localeCompare(b.name)
