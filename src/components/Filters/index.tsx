import { useFilters } from '../../hooks/useFilters'

export function Filters() {
  const { setFilters, filters } = useFilters()

  const handleChangePrice = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: Number(evt.target.value)
    }))
  }

  const handleChangeCategory = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      category: evt.target.value
    }))
  }

  return (
    <header className='flex justify-between px-2 py-4'>
      <div className='flex gap-1 justify-center items-center'>
        <label className='text-gray-100 mr-1' htmlFor='minPriceFilter'>
          Precio Mínimo:
        </label>
        <input
          className='accent-[#9c1111]'
          onChange={handleChangePrice}
          value={filters.minPrice}
          type='range'
          name='range'
          id='minPrice'
          min={1}
          max={900}
        />
        <span className='text-gray-100'>${filters.minPrice}</span>
      </div>
      <div className='flex gap-1 justify-center items-center'>
        <label className='text-gray-100 mr-1' htmlFor='categoryFilter'>
          Categoría
        </label>
        <select
          className='bg-neutral-800 border border-gray-300 text-gray-100  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1'
          onChange={handleChangeCategory}
          name='category'
          id='categoryFilter'
        >
          <option value='all'>Todos</option>
          <option value='Muebles'>Muebles</option>
          <option value='Ropa'>Ropa</option>
          <option value='Shoes'>Zapatillas</option>
        </select>
      </div>
    </header>
  )
}
