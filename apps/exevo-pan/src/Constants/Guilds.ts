export const guildValidationRules = {
  name: {
    MIN: 2,
    MAX: 32,
  },
  server: {
    MIN: 1,
    MAX: 32,
  },
  description: {
    MAX: 600,
  },
  messageBoard: {
    MAX: 2048,
  },
}
