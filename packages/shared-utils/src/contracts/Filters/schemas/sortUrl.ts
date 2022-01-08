export const buildSchema = (
  orderByDefault: number,
  descendingDefault: boolean,
) => [
  {
    key: 'currentPage',
    defaultValue: 1,
    decode: (value: string) => Number(decodeURIComponent(value)),
  },
  {
    key: 'orderBy',
    defaultValue: orderByDefault,
    decode: (value: string) => Number(decodeURIComponent(value)),
  },
  {
    key: 'descending',
    defaultValue: descendingDefault,
    decode: (value: string) => decodeURIComponent(value) === 'true',
  },
]
