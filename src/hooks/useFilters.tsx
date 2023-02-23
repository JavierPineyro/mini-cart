import { Product } from '../types/products'
import { useGlobalContext } from './useGlobalContext'

export function useFilters() {
  const { filters, setFilters } = useGlobalContext()

  const filterProducts = (products: Array<Product>) => {
    return products.filter((items) => {
      return (
        items.price >= filters.minPrice &&
        (filters.category === 'all' || items.category.name === filters.category)
      )
    })
  }

  return {
    filterProducts,
    setFilters,
    filters
  }
}
