import styled from 'styled-components'
import Image from 'next/image'
import {
  Table as BaseTable,
  Input as BaseInput,
  Chip as BaseChip,
} from 'components/Atoms'
import KnightImage from 'assets/knight.png'
import PaladinImage from 'assets/paladin.png'
import SorcererImage from 'assets/sorcerer.png'
import DruidImage from 'assets/druid.png'
import LabelGroup from './LabelGroup'

export const Table = styled(BaseTable)`
  ${BaseTable.HeadColumn}, ${BaseTable.Column} {
    &:nth-child(1) {
      width: 100%;
      padding-left: 8px;
      padding-right: 8px;
      text-align: left;
    }

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      padding-left: 8px;
      padding-right: 8px;
      min-width: 50px;
      text-align: center;
    }

    &:nth-child(2) {
      min-width: 64px;
    }
  }

  ${BaseTable.Column} {
    &:nth-child(2) {
      font-size: 10px;
    }
  }
`

export const ControlHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const Input = styled(BaseInput)`
  max-width: 200px;
  [role='alert'] {
    display: none;
  }
`

export const ToggleFiltersGroup = styled(LabelGroup)`
  margin-bottom: 16px;
  width: 100%;
`

export const FiltersChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const Chip = styled(BaseChip)`
  > div {
    margin-right: 4px !important;
  }
`

export const KnightIcon = styled(Image).attrs({
  src: KnightImage,
  alt: 'Knight',
})``
export const PaladinIcon = styled(Image).attrs({
  src: PaladinImage,
  alt: 'Paladin',
})``
export const SorcererIcon = styled(Image).attrs({
  src: SorcererImage,
  alt: 'Sorcerer',
})``
export const DruidIcon = styled(Image).attrs({
  src: DruidImage,
  alt: 'Druid',
})``
