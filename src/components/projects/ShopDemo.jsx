import { useState } from 'react'
import { products } from '../../data/products'
import { money } from '../../utils/formatMoney'
export default function ShopDemo() {
  const [category, setCategory] = useState('Todos')
  const [cart, setCart] = useState([])
  return (
    <div className="shop-demo">
      <div className="demo-heading">
        <h4>Explorá la demo de Objeto</h4>
        <span aria-live="polite">Carrito · {cart.length}</span>
      </div>
      <div className="filters" aria-label="Categorías de productos">
        {['Todos', 'Iluminación', 'Decoración'].map((item) => (
          <button
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="products">
        {products
          .filter(
            (product) => category === 'Todos' || product.category === category,
          )
          .map((product) => (
            <article key={product.id} className="product">
              <div className="product-art" aria-hidden="true">
                <div className={product.shape} />
              </div>
              <h5>{product.name}</h5>
              <p>{money(product.price)}</p>
              <button
                className="small-button"
                onClick={() => setCart([...cart, product])}
              >
                Agregar al carrito +
              </button>
            </article>
          ))}
      </div>
      <div className="cart-summary">
        <p aria-live="polite">
          Total de muestra:{' '}
          <strong>
            {money(cart.reduce((total, product) => total + product.price, 0))}
          </strong>
        </p>
        <button disabled={!cart.length} onClick={() => setCart([])}>
          Vaciar carrito
        </button>
      </div>
      <small>
        Productos y precios ficticios. Esta demo no realiza pedidos ni cobros.
      </small>
    </div>
  )
}
