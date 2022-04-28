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
      backdrop: 'rgba(0, 0, 0, 0.4)',
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
      primaryVariantHighlight: withOpacityValue('--tw-primaryVariantHighlight'),
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
      none: '0', // 0
      xs: '0.625rem', // 10px
      tsm: '0.75rem', // 12px
      s: '0.875rem', // 14px
      base: '1rem', // 16px
      txl: '1.125rem', // 18px
      l: '1.25rem', // 20px
      xl: '1.375rem', // 22px
      '2xl': '1.5rem', // 24px
    },
    lineHeight: {
      none: 'normal',
      tight: '1.3',
      relaxed: '1.6',
    },
    zIndex: {
      1: '1',
      2: '2',
      3: '3',
      10: '10',
      50: '50',
      51: '51',
      71: '71',
      74: '74',
      75: '75',
      99: '99',
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
      animation: {
        rollIn: 'rollIn 0.8s ease-in',
        fadeIn: 'fadeIn 0.1s ease-out',
        rushIn: 'rushIn 0.1s ease-out',
        slideIn: 'slideIn 0.2s ease-out',
        zoomInAndOut: 'zoomInAndOut 0.6s ease-out forwards',
        swing: 'swing 1.2s ease-out forwards',
        tilt: 'tilt 1s ease-out forwards',
        letGo: 'letGo 1s ease-out forwards',
      },
      keyframes: {
        rollIn: {
          '0%': {
            opacity: 0,
            transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 200deg)',
          },
          '20%': {
            transform: 'translate3d(75%, 0, 0) rotate3d(0, 0, 1, 150deg)',
          },
          '40%': {
            opacity: 1,
            transform: 'translate3d(-10%, 0, 0) rotate3d(0, 0, 1, -30deg)',
          },
          '60%': {
            transform: 'translate3d(5%, 0, 0) rotate3d(0, 0, 1, 15deg)',
          },
          '100%': { transform: 'none' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        rushIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'unset' },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(-100%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        zoomInAndOut: {
          '0%': { transform: 'scale(1)' },
          '20%': {
            transform: 'scale(1.02)',
            boxShadow: '4px 4px 8px 4px rgba(0, 0, 0, 0.1)',
          },
          '80%': {
            transform: 'scale(1.02)',
            boxShadow: '4px 4px 8px 4px rgba(0, 0, 0, 0.1)',
          },
          '100%': { transform: 'scale(1)' },
        },
        swing: {
          '0%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
          '20%': { transform: 'rotate3d(0, 0, 1, -5deg)' },
          '30%': { transform: 'rotate3d(0, 0, 1, -7deg)' },
          '50%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
          '60%': { transform: 'rotate3d(0, 0, 1, 15deg)' },
          '70%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
          '80%': { transform: 'rotate3d(0, 0, 1, 5deg)' },
          '90%': { transform: 'rotate3d(0, 0, 1, -2deg)' },
          '100%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
        },
        tilt: {
          '0%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
          '15%': { transform: 'rotate3d(0, 0, 1, -100deg)' },
          '100%': { transform: 'rotate3d(0, 0, 1, -100deg)' },
        },
        letGo: {
          '0%': { transform: 'rotate3d(0, 0, 1, -100deg)' },
          '20%': { transform: 'rotate3d(0, 0, 1, 60deg)' },
          '40%': { transform: 'rotate3d(0, 0, 1, -40deg)' },
          '60%': { transform: 'rotate3d(0, 0, 1, 20deg)' },
          '80%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
          '100%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('currentpage', "&[aria-current='page']")
      addVariant('child', '& > *')
    }),
  ],
  corePlugins: {
    container: false,
  },
}
