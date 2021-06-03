module.exports = {
    plugins: ['prettier', 'react', '@typescript-eslint'],
    extends: [
        './node_modules/kcd-scripts/eslint.js',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    rules: {
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': [
            1,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'react/react-in-jsx-scope': 'off',

        'testing-library/no-container': 'off',
        'testing-library/no-node-access': 'off',
        'testing-library/no-promise-in-fire-event': 'off',
        'testing-library/no-unnecessary-act': 'off',
        'testing-library/no-wait-for-multiple-assertions': 'off',
        'testing-library/no-wait-for-side-effects': 'off',
        'testing-library/prefer-user-event': 'off',
        'testing-library/render-result-naming-convention': 'off'
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                paths: ['src'],
            },
        },
    },
}