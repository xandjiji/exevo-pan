export const rightMostDigit = (number: number) => +number.toString()[0]

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export const isNumber = (value: string) => numbers.includes(value)
