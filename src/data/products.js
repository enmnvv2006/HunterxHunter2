export const products = [
  { id: 0, name: 'AirPods Pro',   price: 249, image: '/images/earbuds.png',    category: 'audio',       badge: 'Хит',  badgeClass: '',        desc: 'Премиальное качество звука. Активное шумоподавление. Водонепроницаемость IPX4.' },
  { id: 1, name: 'Smart Watch',   price: 399, image: '/images/watch.png',      category: 'accessories', badge: '-20%', badgeClass: 'sale-tag', desc: 'Ультратонкий корпус из титана. Дисплей Always-On. Мониторинг здоровья 24/7.' },
  { id: 2, name: 'Nordic Wallet', price: 89,  image: '/images/wallet.png',     category: 'accessories', badge: 'New',  badgeClass: 'new-tag', desc: 'Натуральная кожа премиум-класса. RFID-защита. Минималистичный дизайн.' },
  { id: 3, name: 'Studio Pro',    price: 349, image: '/images/headphones.png', category: 'audio',       badge: 'Топ',  badgeClass: 'top-tag', desc: 'Полноразмерные наушники с Hi-Res Audio. 40 часов работы. Адаптивный ANC.' },
  { id: 4, name: 'SonicWave',     price: 129, image: '/images/speaker.png',    category: 'audio',       badge: 'New',  badgeClass: 'new-tag', desc: 'Портативная колонка с 360° звуком. IP67 защита. 24 часа воспроизведения.' },
  { id: 5, name: 'Aviator Black', price: 179, image: '/images/sunglasses.png', category: 'accessories', badge: '-15%', badgeClass: 'sale-tag', desc: 'Поляризованные линзы. Титановая оправа. UV400 защита от солнца.' },
  { id: 6, name: 'Urban Pack',    price: 119, image: '/images/backpack.png',   category: 'accessories', badge: 'Хит',  badgeClass: '',        desc: 'Водоотталкивающий материал. Отделение для ноутбука 15". Скрытый карман.' },
  { id: 7, name: 'MagCharge',     price: 49,  image: '/images/charger.png',    category: 'accessories', badge: 'New',  badgeClass: 'new-tag', desc: 'Беспроводная зарядка 15W. Совместимость с MagSafe. Индикатор заряда.' },
  { id: 8, name: 'MechKey 75',    price: 199, image: '/images/keyboard.png',   category: 'accessories', badge: 'Топ',  badgeClass: 'top-tag', desc: 'Механическая клавиатура 75%. Алюминиевый корпус. Hot-swap переключатели.' },
];

export const categoryMap = {
  all: 'Все',
  new: 'Новинки',
  sale: 'Скидки',
  top: 'Топ',
  audio: 'Аудио',
  accessories: 'Аксессуары',
};

export const categories = [
  { key: 'all', label: 'Все', dotClass: '' },
  { key: 'new', label: 'Новинки', dotClass: 'new' },
  { key: 'sale', label: 'Скидки', dotClass: 'sale' },
  { key: 'top', label: 'Топ', dotClass: 'top' },
  { key: 'audio', label: 'Аудио', dotClass: 'audio' },
  { key: 'accessories', label: 'Аксессуары', dotClass: 'acc' },
];
