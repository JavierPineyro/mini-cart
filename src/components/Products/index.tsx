import { CartAddIcon, CartRemoveIcon } from '../Icons'

import { useGlobalCart } from '../../hooks/useGlobalContext'
import { Product } from '../../types/products'
import './products.css'

type Props = {
  products: Array<Product>
}
export const Products = ({ products }: Props) => {
  const { addToCart, removeFromCart, cart } = useGlobalCart()

  const checkProductInCart = (product) => {
    return cart.some((item) => item.product.id === product.id)
  }

  return (
    <main className='products'>
      <ul>
        {products.map((entry) => {
          const isProductInCart = checkProductInCart(entry)
          const buttonSeoTitle = isProductInCart
            ? 'Remove product'
            : 'Add product'
          const iconCart = isProductInCart ? (
            <CartRemoveIcon />
          ) : (
            <CartAddIcon />
          )
          return (
            <li
              key={entry.id}
              className='flex flex-col justify-around gap-1 p-0 bg-neutral-800 rounded text-gray-100'
            >
              <img src={entry.images[0]} alt={entry.description} />
              <div className='text-center'>
                {entry.title} - ${entry.price}
              </div>
              <div className='flex justify-center'>
                <button
                  title={buttonSeoTitle}
                  className='rounded-full p-2 w-fit hover:bg-neutral-700 transition'
                  onClick={() => {
                    return isProductInCart
                      ? removeFromCart(entry)
                      : addToCart({ product: entry, quantity: 0 })
                  }}
                >
                  {iconCart}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
