import Navbar from './Navbar';
import { categoryMap } from '../data/products';

export default function ProductScreen({ product, isInCart, cart, onAddToCart, onGoBack, onOpenCart }) {
  if (!product) return null;

  return (
    <>
      <Navbar cart={cart} onOpenCart={onOpenCart} showBack onGoBack={onGoBack} />

      <div className="product-detail">
        <div className="product-detail-inner">
          <div className="product-image-wrap">
            <div className="product-image-glow" />
            <img src={product.image} alt={product.name} className="product-hero-img" />
          </div>

          <div className="product-info-block">
            <span className="product-category-tag">
              {categoryMap[product.category] || product.category}
            </span>
            <h1 className="product-name">{product.name}</h1>
            <p className="product-price">${product.price}</p>
            <p className="product-desc">{product.desc}</p>

            <button
              className={`action-btn add-to-cart-btn${isInCart ? ' added' : ''}`}
              onClick={() => onAddToCart(product)}
            >
              {isInCart ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Добавлено
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  В корзину
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
