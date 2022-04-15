const plugin = require('tailwindcss/plugin')

const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue) return `rgb(var(${variable}) / ${opacityValue})`
    return `rgb(var(${variable}))`
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
      xl: '1400px',
    },
    /* @ ToDo: remove this 'tw' prefix */
    colors: {
      transparent: 'transparent',
      background: withOpacityValue('--tw-background'),
      surface: withOpacityValue('--tw-surface'),
      onSurface: withOpacityValue('--tw-onSurface'),
      separator: withOpacityValue('--tw-separator'),
      primary: withOpacityValue('--tw-primary'),
      primaryHighlight: withOpacityValue('--tw-primaryHighlight'),
      darkerPrimary: withOpacityValue('--tw-darkerPrimary'),
      onPrimary: withOpacityValue('--tw-onPrimary'),
      primaryVariant: withOpacityValue('--tw-primaryVariant'),
      primaryVariantHighlight: withOpacityValue(
        '--tw-primaryVariantHighlight)',
      ),
      green: withOpacityValue('--tw-green'),
      greenHighlight: withOpacityValue('--tw-greenHighlight'),
      red: withOpacityValue('--tw-red'),
      alert: withOpacityValue('--tw-alert'),
      battleGreen: withOpacityValue('--tw-battleGreen'),
      battleYellow: withOpacityValue('--tw-battleYellow'),
      kwai: withOpacityValue('--tw-kwai'),
      kwaiSurface: withOpacityValue('--tw-kwaiSurface'),
      kwaiVariant: withOpacityValue('--tw-kwaiVariant'),
      black: withOpacityValue('--tw-black'),
    },
    fontSize: {
      xs: '0.625rem', // 10px
      tsm: '0.75rem', // 12px
      s: '0.875rem', // 14px
      base: '1rem', // 16px
      txl: '1.125rem', // 18px
      l: '1.25rem', // 20px
      xl: '1.375rem', // 22px
      '2xl': '1.5rem', // 24px
    },
    zIndex: {
      1: '1',
      2: '2',
      3: '3',
      10: '10',
      71: '71',
      74: '74',
      75: '75',
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('currentpage', "&[aria-current='page']")
    }),
  ],
  corePlugins: {
    container: false,
  },
}
