import '@testing-library/jest-dom/extend-expect'

jest.mock('utils/debounce', () => ({ debounce: fn => fn }))
