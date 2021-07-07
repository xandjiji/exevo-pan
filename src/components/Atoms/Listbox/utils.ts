export const indexToId = (index: number | undefined): string | undefined =>
  index === undefined ? undefined : `listbox-item-${index}`
