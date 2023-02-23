import { createContext, useState } from 'react'
import { SetState, State } from '../types'

type ContextType = {
  filters: State
  setFilters: SetState
}
type Children = {
  children: React.ReactNode
}

const INITIAL_STATE_FILTER = {
  category: 'all',
  minPrice: 1
}
// ||||||||||||||||||||||||||||||||||||||||||

export const FiltersContext = createContext<ContextType>({
  filters: INITIAL_STATE_FILTER,
  setFilters: () => {}
})

export const FilterProvider: React.FC<Children> = ({ children }) => {
  const [filters, setFilters] = useState<State>(INITIAL_STATE_FILTER)

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}
