import { useState, useEffect } from 'react';

export default function Navbar({ cart, onOpenCart, showBack, onGoBack, title }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {showBack ? (
          <button className="back-btn" onClick={onGoBack} aria-label="Назад">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            <span>Назад</span>
          </button>
        ) : (
          <a href="#" className="logo" onClick={e => e.preventDefault()}>
            <span className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12l2 2 4-4"/>
              </svg>
            </span>
            WristShop
          </a>
        )}

        {title ? (
          <span className="nav-title">{title}</span>
        ) : (
          <div className="nav-right">
            <span className="time-display">{time}</span>
            <button className="cart-btn" onClick={onOpenCart} aria-label="Корзина">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <CartBadge count={cart.length} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

function CartBadge({ count }) {
  return (
    <span className={`cart-badge${count > 0 ? ' visible' : ''}`}>
      {count}
    </span>
  );
}
