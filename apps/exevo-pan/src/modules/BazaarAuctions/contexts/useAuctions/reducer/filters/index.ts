import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import {
  sharedGreaterGems,
  vocationGreaterGems,
} from 'data-dictionary/dist/dictionaries/gems'
import { countActiveFilters, resetPagination } from '../utils'
import { Reducer } from '../types'
import { FilterAction } from './types'
import { toggleSet } from './utils'

const sharedGems = new Set<string>(Object.values(sharedGreaterGems))

const FilterReducer: Reducer<FilterAction> = (state, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filterState: { ...state.filterState, ...action.filterOptions },
      }

    case 'SET_SIMILAR_FILTERS':
      return {
        ...state,
        filterState: { ...DEFAULT_FILTER_OPTIONS, ...action.filterOptions },
      }

    case 'TOGGLE_FILTER':
      return {
        ...state,
        filterState: {
          ...state.filterState,
          [action.key]: !state.filterState[action.key],
        },
      }

    case 'TOGGLE_FILTER_SET':
      return {
        ...state,
        filterState: {
          ...state.filterState,
          [action.key]: toggleSet(state.filterState[action.key], action.value),
        },
      }

    case 'TOGGLE_VOCATION': {
      const nextVocation = toggleSet(state.filterState.vocation, action.value)
      const nextState: typeof state = {
        ...state,
        filterState: { ...state.filterState, vocation: nextVocation },
      }

      if (nextVocation.has(vocation.VOCATION_IDS.NONE)) {
        nextState.filterState.greaterGemsSet = new Set([])
        return nextState
      }

      if (nextVocation.size >= 2) {
        nextState.filterState.greaterGemsSet = new Set(
          [...nextState.filterState.greaterGemsSet].filter((gem) =>
            sharedGems.has(gem),
          ),
        )
      }

      return nextState
    }

    case 'TOGGLE_SUPREME_GEM': {
      const greaterGemsSet = toggleSet(
        state.filterState.greaterGemsSet,
        action.value,
      )

      const nextState: typeof state = {
        ...state,
        filterState: { ...state.filterState, greaterGemsSet },
      }

      if (greaterGemsSet.size === 0) return nextState

      const gemsList = [...greaterGemsSet]
      const vocationSpecificGem = gemsList.find((gem) => !sharedGems.has(gem))

      if (!vocationSpecificGem) return nextState

      // we should infer the vocation:
      const nextVocation = new Set<number>([])
      if (
        vocationGreaterGems.knight[
          vocationSpecificGem as keyof typeof vocationGreaterGems.knight
        ]
      ) {
        nextVocation.add(vocation.VOCATION_IDS.KNIGHT)
      } else if (
        vocationGreaterGems.paladin[
          vocationSpecificGem as keyof typeof vocationGreaterGems.paladin
        ]
      ) {
        nextVocation.add(vocation.VOCATION_IDS.PALADIN)
      } else if (
        vocationGreaterGems.sorcerer[
          vocationSpecificGem as keyof typeof vocationGreaterGems.sorcerer
        ]
      ) {
        nextVocation.add(vocation.VOCATION_IDS.SORCERER)
      } else if (
        vocationGreaterGems.druid[
          vocationSpecificGem as keyof typeof vocationGreaterGems.druid
        ]
      ) {
        nextVocation.add(vocation.VOCATION_IDS.DRUID)
      } else if (
        vocationGreaterGems.monk[
          vocationSpecificGem as keyof typeof vocationGreaterGems.monk
        ]
      ) {
        nextVocation.add(vocation.VOCATION_IDS.MONK)
      }

      nextState.filterState.vocation = nextVocation

      return nextState
    }

    case 'TOGGLE_ALL_FILTER_SET_OPTION':
      return {
        ...state,
        filterState: {
          ...state.filterState,
          [action.key]:
            state.filterState[action.key].size === action.allOptions.length
              ? new Set([])
              : new Set(action.allOptions.map(({ value }) => value)),
        },
      }

    case 'TOGGLE_ADDON': {
      const currentAddon = state.filterState.addon

      return {
        ...state,
        filterState: {
          ...state.filterState,
          addon:
            currentAddon === 3 || currentAddon === action.value
              ? currentAddon - action.value
              : currentAddon + action.value,
        },
      }
    }

    case 'RESET_FILTERS':
      return { ...state, filterState: DEFAULT_FILTER_OPTIONS }

    case 'SET_DEFAULT':
      return {
        ...state,
        filterState: {
          ...state.filterState,
          [action.key]: DEFAULT_FILTER_OPTIONS[action.key],
        },
      }

    default:
      return state
  }
}

const reducer: Reducer<FilterAction> = (state, action) => {
  const nextState = FilterReducer(state, action)

  nextState.activeFilterCount = countActiveFilters(
    DEFAULT_FILTER_OPTIONS,
    nextState.filterState,
  )

  return resetPagination(nextState)
}

export default reducer
