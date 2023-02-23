import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { FiltersContext } from '../context/filters'

export const useGlobalContext = () => useContext(FiltersContext)

export const useGlobalCart = () => useContext(CartContext)
