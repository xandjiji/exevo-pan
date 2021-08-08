export const indexToId = (
  index: number | undefined,
  suffix?: string,
): string | undefined =>
  index === undefined
    ? undefined
    : `listbox-item-${index}${suffix ? `-${suffix}` : ''}`
