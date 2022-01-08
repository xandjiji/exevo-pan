const Themes = {
    'dark-theme': {
        colors: {
            background: '#202225',
            surface: '#36393F',
            onSurface: '#FFFFFF',
            separator: '#72767D',
            primary: '#9857E7',
            onPrimary: '#FFFFFF',
            primaryVariant: '#5E4480',
            darkerPrimary: '#581F9B',
            green: '#5A9935',
            red: '#FF5B5B',
            alert: '#F9EEC1',
            battleGreen: '#43B600',
            battleYellow: '#FFDD00',
            primaryVariantHighlight: '#714CA1',
            kwai: '#FF7705',
            kwaiSurface: '#453D3C',
            kwaiVariant: '#995F2E',
        },
    },
    'light-theme': {
        colors: {
            background: '#EEEEEE',
            surface: '#FFFFFF',
            onSurface: '#000000',
            separator: '#B4B4B4',
            primary: '#3F51B5',
            onPrimary: '#FFFFFF',
            primaryVariant: '#C5CAE9',
            darkerPrimary: '#323D8E',
            green: '#377712',
            red: '#C51313',
            alert: '#F9EEC1',
            battleGreen: '#43B600',
            battleYellow: '#FFDD00',
            primaryVariantHighlight: '#E7E8EE',
            kwai: '#FF7705',
            kwaiSurface: '#FFF7F0',
            kwaiVariant: '#FFC696',
        }
    }
}

function getInitialTheme() {
    if (typeof window !== 'undefined') {
        const persistedColorPreference = window.localStorage.getItem('themeData')
        if (persistedColorPreference) return persistedColorPreference

        const browserDefault = window.matchMedia('(prefers-color-scheme: dark)')
        if (browserDefault.matches) return 'dark-theme'
    }

    return 'light-theme'
}

function injectCssVariables(themeName) {
    const { colors } = Themes[themeName];
    const root = document.documentElement;

    Object.keys(colors).forEach((key) => {
        root.style.setProperty(
            `--${key}`,
            colors[key]
        );
    })

    document
        .querySelector('meta[name=theme-color]')
        ?.setAttribute('content', colors.primary)

    document
        .querySelector('meta[name=msapplication-navbutton-color]')
        ?.setAttribute('content', colors.primary)
}

injectCssVariables(getInitialTheme())