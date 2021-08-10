export const indexToId = (index: number | undefined): string | undefined =>
  index === undefined ? undefined : `radio-item-${index}`
