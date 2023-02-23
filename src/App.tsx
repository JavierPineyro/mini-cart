import { CartProvider } from './context/cart'
import { Products } from './components/Products'
import { Filters } from './components/Filters'
import { useFilters } from './hooks/useFilters'
import { Cart } from './components/Cart'
import InitialState from './data/products.json' assert { type: 'json' }

import './App.css'

export const App: React.FC = () => {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(InitialState)

  return (
    <CartProvider>
      <div className='App'>
        <h1 className='text-gray-100 text-center text-3xl py-4 font-extrabold'>
          Mini Ecommerce
        </h1>
        <Filters />
        <Cart />
        <Products products={filteredProducts} />
      </div>
    </CartProvider>
  )
}
