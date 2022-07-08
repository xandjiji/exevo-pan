import { Mask } from '../../components/Atoms/Input/types'

export const numberWithCommaSeparator: Mask = (value) =>
  value
    .toString()
    .replace(/,/g, '')
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
