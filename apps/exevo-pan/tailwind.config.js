const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/templates/**/*.tsx',
    './src/modules/**/*.tsx',
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
    },
    /* @ ToDo: remove this 'tw' prefix */
    colors: {
      background: withOpacityValue('(--tw-background)'),
      surface: withOpacityValue('(--tw-surface)'),
      onSurface: withOpacityValue('(--tw-onSurface)'),
      separator: withOpacityValue('(--tw-separator)'),
      primary: withOpacityValue('(--tw-primary)'),
      onPrimary: withOpacityValue('(--tw-onPrimary)'),
      primaryVariant: withOpacityValue('(--tw-primaryVariant)'),
      darkerPrimary: withOpacityValue('(--tw-darkerPrimary)'),
      green: withOpacityValue('(--tw-green)'),
      red: withOpacityValue('(--tw-red)'),
      alert: withOpacityValue('(--tw-alert)'),
      battleGreen: withOpacityValue('(--tw-battleGreen)'),
      battleYellow: withOpacityValue('(--tw-battleYellow)'),
      primaryVariantHighlight: withOpacityValue(
        '(--tw-primaryVariantHighlight)',
      ),
      kwai: withOpacityValue('(--tw-kwai)'),
      kwaiSurface: withOpacityValue('(--tw-kwaiSurface)'),
      kwaiVariant: withOpacityValue('(--tw-kwaiVariant)'),
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
