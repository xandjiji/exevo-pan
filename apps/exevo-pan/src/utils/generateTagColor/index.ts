const LIGHT = {
  BACKGROUND: '74%',
  TEXT: '30%',
}

const saturation = (active: boolean): string => (active ? '100%' : '0%')

const background = (color: number, active = true): string =>
  `hsl(${color}, ${saturation(active)}, ${LIGHT.BACKGROUND})`

const text = (color: number, active = true): string =>
  `hsl(${color}, ${saturation(active)}, ${LIGHT.TEXT})`

export const generateTagColors = (
  color: number,
): Pick<BlogTag, 'background' | 'text'> => ({
  background: {
    active: background(color),
    inactive: background(color, false),
  },
  text: {
    active: text(color),
    inactive: text(color, false),
  },
})
