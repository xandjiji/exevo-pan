export const indexToId = (index: number | undefined): string | undefined =>
  index ? `listbox-item-${index}` : undefined
