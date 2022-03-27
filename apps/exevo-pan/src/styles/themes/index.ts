import light from './light'
import dark from './dark'

const Themes: Record<string, Theme> & { default: Theme } = {
  light,
  dark,
  default: light,
}

export default Themes
