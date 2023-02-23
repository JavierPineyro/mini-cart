import { createContext, useState } from 'react'
import { useStorage } from '../hooks/useStorage'
import { Product } from '../types/products'

export type CartProduct = {
  product: Product
  quantity: number
}

type ContextType = {
  cart: CartProduct[] | []
  addToCart: (product: CartProduct) => void
  cleanCart: () => void
  removeFromCart: (product: Product) => void
  deleteSingleItemFromCart: (product: CartProduct) => void
}
type Children = {
  children: React.ReactNode
}

const INITIAL_STATE = []

export const CartContext = createContext<ContextType>({
  cart: INITIAL_STATE,
  addToCart: () => {},
  cleanCart: () => {},
  removeFromCart: () => {},
  deleteSingleItemFromCart: () => {}
})

export const CartProvider = ({ children }: Children) => {
  const { saveIntoStorage, getFromStorage } = useStorage()

  const [cart, setCart] = useState<[] | CartProduct[]>(() => {
    let storage = getFromStorage()
    if (storage) {
      return storage
    }
    return INITIAL_STATE
  })

  const addToCart = (productToAdd: CartProduct) => {
    const indexProductInCart = cart.findIndex(
      (item) => item.product.id === productToAdd.product.id
    )

    if (indexProductInCart >= 0) {
      let newCart = structuredClone(cart)
      newCart[indexProductInCart].quantity += 1
      setCart(newCart)
      saveIntoStorage(newCart)
    } else {
      setCart((prev) => {
        saveIntoStorage([...prev, { ...productToAdd, quantity: 1 }])
        return [...prev, { ...productToAdd, quantity: 1 }]
      })
    }
  }

  const deleteSingleItemFromCart = (productToDelete: CartProduct) => {
    let indexOfProduct = cart.findIndex(
      (item) => item.product.id === productToDelete.product.id
    )

    if (indexOfProduct >= 0) {
      let newCart = structuredClone(cart)
      let itemFromCart = newCart[indexOfProduct]
      if (itemFromCart.quantity === 1) {
        removeFromCart(itemFromCart.product)
      }
      if (itemFromCart.quantity > 1) {
        itemFromCart.quantity -= 1
        saveIntoStorage(newCart)
        setCart(newCart)
      }
    }
  }

  const removeFromCart = (productToRemove: Product) => {
    setCart((prev) => {
      let newFilterdCart = prev.filter(
        (item) => item.product.id !== productToRemove.id
      )
      saveIntoStorage(newFilterdCart)
      return newFilterdCart
    })
  }

  const cleanCart = () => {
    setCart([])
    saveIntoStorage([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        cleanCart,
        removeFromCart,
        deleteSingleItemFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
