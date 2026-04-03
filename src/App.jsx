import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import CartScreen from './components/CartScreen';
import Toast from './components/Toast';
import { products } from './data/products';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [previousScreen, setPreviousScreen] = useState(null);
  const [direction, setDirection] = useState('forward');
  const [cart, setCart] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [toast, setToast] = useState({ visible: false, text: '' });
  const toastTimer = useRef(null);

  // Navigation
  const navigateTo = useCallback((screen, dir = 'forward') => {
    setPreviousScreen(currentScreen);
    setDirection(dir);
    setCurrentScreen(screen);
  }, [currentScreen]);

  // Toast
  const showToast = useCallback((text) => {
    clearTimeout(toastTimer.current);
    setToast({ visible: true, text });
    toastTimer.current = setTimeout(() => setToast({ visible: false, text: '' }), 2000);
  }, []);

  // Cart actions
  const addToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast('Удалено из корзины');
        return prev.filter(item => item.id !== product.id);
      }
      showToast('Добавлено в корзину ✓');
      return [...prev, { ...product }];
    });
  }, [showToast]);

  const removeFromCart = useCallback((index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Удалено');
  }, [showToast]);

  const checkout = useCallback(() => {
    if (cart.length === 0) return;
    showToast('Обработка оплаты... 💳');
    setTimeout(() => {
      setCart([]);
      showToast('Заказ оформлен ✓');
      setTimeout(() => navigateTo('home', 'back'), 1400);
    }, 1800);
  }, [cart.length, showToast, navigateTo]);

  // Open product detail
  const openProduct = useCallback((productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setCurrentProduct(product);
      navigateTo('product', 'forward');
    }
  }, [navigateTo]);

  const openCart = useCallback(() => {
    navigateTo('cart', 'forward');
  }, [navigateTo]);

  const goHome = useCallback(() => {
    navigateTo('home', 'back');
  }, [navigateTo]);

  const isInCart = useCallback((productId) => {
    return cart.some(item => item.id === productId);
  }, [cart]);

  return (
    <>
      <Screen name="home" currentScreen={currentScreen} previousScreen={previousScreen} direction={direction}>
        <HomeScreen
          cart={cart}
          onOpenProduct={openProduct}
          onOpenCart={openCart}
        />
      </Screen>

      <Screen name="product" currentScreen={currentScreen} previousScreen={previousScreen} direction={direction}>
        <ProductScreen
          product={currentProduct}
          isInCart={currentProduct ? isInCart(currentProduct.id) : false}
          cart={cart}
          onAddToCart={addToCart}
          onGoBack={goHome}
          onOpenCart={openCart}
        />
      </Screen>

      <Screen name="cart" currentScreen={currentScreen} previousScreen={previousScreen} direction={direction}>
        <CartScreen
          cart={cart}
          onRemove={removeFromCart}
          onCheckout={checkout}
          onGoBack={goHome}
        />
      </Screen>

      <Toast visible={toast.visible} text={toast.text} />
    </>
  );
}

function Screen({ name, currentScreen, previousScreen, direction, children }) {
  const isActive = currentScreen === name;
  const isExiting = previousScreen === name && currentScreen !== name;

  let className = 'screen';
  if (isActive) className += ' active';
  if (isExiting) {
    className += direction === 'forward' ? ' exit-left' : ' exit-right';
  }

  return <div className={className}>{children}</div>;
}
