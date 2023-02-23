import { CartProduct } from '../../context/cart'
import { useGlobalCart } from '../../hooks/useGlobalContext'
import { CartIcon, CartCleanIcon, PlusIcon, MinusIcon } from '../Icons'
import './cart.css'

export function Cart() {
  const { cart, cleanCart, addToCart, deleteSingleItemFromCart } =
    useGlobalCart()
  return (
    <>
      <label
        className='cart-label bg-neutral-700 hover:bg-neutral-600 p-2'
        htmlFor='checkboxId'
        title='Cart'
      >
        <CartIcon />
      </label>
      <input hidden type='checkbox' name='checkbox' id='checkboxId' />

      <aside className='cart text-gray-100'>
        <h3 className='text-2xl text-gray-100 text-center font-semibold underline mb-4'>
          Cart List
        </h3>
        <div className='flex items-center justify-center mb-3'>
          <button
            className='w-fit bg-neutral-700 hover:bg-neutral-600 rounded-full p-1'
            title='Clean cart'
            onClick={cleanCart}
          >
            <CartCleanIcon />
          </button>
        </div>
        <ul className='flex flex-col gap-6'>
          {cart.map((item: CartProduct) => {
            const { id, title, price, images, description, ...rest } =
              item.product
            return (
              <CartItem
                key={id}
                id={id}
                title={title}
                price={price}
                images={images}
                description={description}
                quantity={item.quantity}
                restOfProduct={rest}
                addToCart={addToCart}
                deleteItem={deleteSingleItemFromCart}
              />
            )
          })}
        </ul>
      </aside>
    </>
  )
}

function CartItem({
  id,
  title,
  price,
  images,
  description,
  quantity,
  restOfProduct,
  addToCart,
  deleteItem
}) {
  return (
    <li className='flex flex-col gap-2'>
      <img src={images[0]} alt={description} />
      <h3 className='text-center w-full text-gray-100 font-semibold'>
        {title} - <span className='font-bold'>${price}</span>
      </h3>
      <div className='flex justify-center items-center gap-1 text-sm text-gray-100'>
        <button
          title='-1'
          className='bg-neutral-700 hover:bg-neutral-600 w-fit rounded-full'
          onClick={() =>
            deleteItem({
              product: { id, title, price, images, description, restOfProduct },
              quantity: quantity
            })
          }
        >
          <MinusIcon />
        </button>
        <span>Cantidad: {quantity}</span>
        <button
          title='+1'
          className='bg-neutral-700 hover:bg-neutral-600 w-fit rounded-full'
          onClick={() =>
            addToCart({
              product: { id, title, price, images, description, restOfProduct },
              quantity: quantity
            })
          }
        >
          <PlusIcon />
        </button>
      </div>
    </li>
  )
}
