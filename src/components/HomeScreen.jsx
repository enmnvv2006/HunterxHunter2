import { useState, useMemo, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { products, categories } from '../data/products';

export default function HomeScreen({ cart, onOpenProduct, onOpenCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    let result = products;

    if (activeCategory === 'new') {
      result = result.filter(p => p.badgeClass === 'new-tag');
    } else if (activeCategory === 'sale') {
      result = result.filter(p => p.badgeClass === 'sale-tag');
    } else if (activeCategory === 'top') {
      result = result.filter(p => p.badgeClass === 'top-tag');
    } else if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q)
      );
    }

    return result;
  }, [searchQuery, activeCategory]);

  const word = filtered.length === 1 ? 'товар' : (filtered.length < 5 ? 'товара' : 'товаров');

  return (
    <>
      <Navbar cart={cart} onOpenCart={onOpenCart} />

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1 className="hero-title">
              Откройте для себя<br/>
              <span className="accent-text">лучшие гаджеты</span>
            </h1>
            <p className="hero-subtitle">Премиальная техника с доставкой на следующий день</p>
          </div>

          <div className="search-wrapper">
            <div className="search-bar-input">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="search-field"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
              <button
                className={`search-clear${searchQuery ? ' visible' : ''}`}
                onClick={() => { setSearchQuery(''); inputRef.current?.focus(); }}
                aria-label="Очистить"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="chips-row">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`chip${activeCategory === cat.key ? ' active-chip' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.dotClass && <span className={`chip-dot ${cat.dotClass}`} />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="products-inner">
          <div className="section-header">
            <h2 className="section-title">Популярные товары</h2>
            <span className="results-count">{filtered.length} {word}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="no-results visible">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p className="no-results-title">Ничего не найдено</p>
              <p className="no-results-sub">Попробуйте другой запрос</p>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((product, i) => (
                <button
                  key={product.id}
                  className="product-card fade-in"
                  style={{ animationDelay: `${i * 0.06}s` }}
                  onClick={() => onOpenProduct(product.id)}
                >
                  <div className="card-image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <span className={`card-badge-tag ${product.badgeClass}`}>{product.badge}</span>
                  </div>
                  <div className="card-info">
                    <span className="card-name">{product.name}</span>
                    <span className="card-price">${product.price}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
