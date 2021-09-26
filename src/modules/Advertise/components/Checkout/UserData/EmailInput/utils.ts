const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateEmail = (email: string): boolean => emailRegex.test(email)
