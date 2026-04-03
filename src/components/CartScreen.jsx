import Navbar from './Navbar';

export default function CartScreen({ cart, onRemove, onCheckout, onGoBack }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const isEmpty = cart.length === 0;

  return (
    <>
      <Navbar showBack onGoBack={onGoBack} title="Корзина" cart={cart} />

      <div className="cart-content">
        <div className="cart-content-inner">
          {isEmpty ? (
            <div className="cart-empty visible">
              <div className="empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <p className="empty-title">Корзина пуста</p>
              <p className="empty-sub">Добавьте товары из каталога</p>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item" style={{ animationDelay: `${index * 0.06}s` }}>
                  <div className="cart-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">${item.price}</span>
                  </div>
                  <button className="remove-btn" onClick={() => onRemove(index)} aria-label="Удалить">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`cart-footer${isEmpty ? ' hidden' : ''}`}>
        <div className="cart-footer-inner">
          <div className="cart-total">
            <span className="total-label">Итого</span>
            <span className="total-value">${total}</span>
          </div>
          <button className="action-btn checkout-btn" onClick={onCheckout}>
            Оплатить
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
