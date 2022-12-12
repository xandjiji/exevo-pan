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
      sm: '540px',
      md: '768px',
      lg: '1024px',
      lgr: '1200px',
      xl: '1400px',
      '2xl': '1600px',
    },
    colors: {
      backdrop: 'rgba(0, 0, 0, 0.4)',
      transparent: 'transparent',
      background: withOpacityValue('--background'),
      surface: withOpacityValue('--surface'),
      onSurface: withOpacityValue('--onSurface'),
      separator: withOpacityValue('--separator'),
      primary: withOpacityValue('--primary'),
      primaryHighlight: withOpacityValue('--primaryHighlight'),
      darkerPrimary: withOpacityValue('--darkerPrimary'),
      onPrimary: withOpacityValue('--onPrimary'),
      primaryVariant: withOpacityValue('--primaryVariant'),
      primaryVariantHighlight: withOpacityValue('--primaryVariantHighlight'),
      green: withOpacityValue('--green'),
      greenHighlight: withOpacityValue('--greenHighlight'),
      red: withOpacityValue('--red'),
      alert: withOpacityValue('--alert'),
      battleGreen: withOpacityValue('--battleGreen'),
      battleYellow: withOpacityValue('--battleYellow'),
      kwai: withOpacityValue('--kwai'),
      kwaiSurface: withOpacityValue('--kwaiSurface'),
      kwaiVariant: withOpacityValue('--kwaiVariant'),
      black: withOpacityValue('--black'),
      rare: withOpacityValue('--rare'),
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
      4: '4',
      5: '5',
      10: '10',
      50: '50',
      51: '51',
      'above-tooltip': '52',
      footer: '70',
      71: '71',
      74: '74',
      75: '75',
      dialog: '76',
      99: '99',
    },
    boxShadow: {
      sm: '2px 2px 4px 2px rgba(0, 0, 0, 0.04)',
      DEFAULT: '2px 2px 4px 2px rgba(0, 0, 0, 0.07)',
      md: '2px 2px 4px 2px rgba(0, 0, 0, 0.1)',
      lg: '2px 2px 4px 2px rgba(0, 0, 0, 0.13)',
      inner: 'inset 2px 2px rgba(0, 0, 0, 0.14)',
      none: '0 0 #0000',
      rare: 'inset 0px 0px 16px 3px rgb(var(--rare))',
    },
    extend: {
      borderRadius: {
        inherit: 'inherit',
      },
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
        blinking: 'blinking 1s ease-out infinite',
        implode: 'implode 0.2s ease-out forwards',
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
        blinking: {
          '0%': { opacity: 1 },
          '50%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        implode: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('currentpage', "&[aria-current='page']")
      addVariant('hidden-accessibility', "&[aria-hidden='true']")
      addVariant('child', '& > *')
    }),
  ],
  corePlugins: {
    container: false,
  },
}
