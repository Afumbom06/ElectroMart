// Product data store
export interface Laptop {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
  };
  colors: string[];
  rating: number;
  reviews: number;
  featured?: boolean;
}

export const laptops: Laptop[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    price: 2499,
    originalPrice: 2799,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    specs: {
      processor: 'Apple M3 Pro',
      ram: '16GB',
      storage: '512GB SSD',
      display: '16" Liquid Retina XDR',
      graphics: 'Integrated GPU'
    },
    colors: ['Space Gray', 'Silver'],
    rating: 4.9,
    reviews: 1247,
    featured: true
  },
  {
    id: '2',
    name: 'MacBook Air 15"',
    brand: 'Apple',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
    specs: {
      processor: 'Apple M2',
      ram: '8GB',
      storage: '256GB SSD',
      display: '15.3" Liquid Retina',
      graphics: 'Integrated GPU'
    },
    colors: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    rating: 4.8,
    reviews: 892,
    featured: true
  },
  {
    id: '3',
    name: 'XPS 15',
    brand: 'Dell',
    price: 1899,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80',
    specs: {
      processor: 'Intel Core i7-13700H',
      ram: '16GB',
      storage: '512GB SSD',
      display: '15.6" OLED 3.5K',
      graphics: 'NVIDIA RTX 4050'
    },
    colors: ['Platinum Silver', 'Graphite'],
    rating: 4.7,
    reviews: 634,
    featured: true
  },
  {
    id: '4',
    name: 'Spectre x360',
    brand: 'HP',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
    specs: {
      processor: 'Intel Core i7-1355U',
      ram: '16GB',
      storage: '1TB SSD',
      display: '13.5" OLED 3K2K',
      graphics: 'Intel Iris Xe'
    },
    colors: ['Nightfall Black', 'Nocturne Blue'],
    rating: 4.6,
    reviews: 421,
  },
  {
    id: '5',
    name: 'ThinkPad X1 Carbon',
    brand: 'Lenovo',
    price: 1749,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
    specs: {
      processor: 'Intel Core i7-1365U',
      ram: '32GB',
      storage: '1TB SSD',
      display: '14" WUXGA',
      graphics: 'Intel Iris Xe'
    },
    colors: ['Black'],
    rating: 4.7,
    reviews: 789,
  },
  {
    id: '6',
    name: 'ROG Zephyrus G14',
    brand: 'Asus',
    price: 1999,
    originalPrice: 2299,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
    specs: {
      processor: 'AMD Ryzen 9 7940HS',
      ram: '32GB',
      storage: '1TB SSD',
      display: '14" QHD+ 165Hz',
      graphics: 'NVIDIA RTX 4060'
    },
    colors: ['Eclipse Gray', 'Moonlight White'],
    rating: 4.8,
    reviews: 567,
    featured: true
  },
  {
    id: '7',
    name: 'Surface Laptop 5',
    brand: 'Microsoft',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
    specs: {
      processor: 'Intel Core i5-1245U',
      ram: '16GB',
      storage: '512GB SSD',
      display: '13.5" PixelSense',
      graphics: 'Intel Iris Xe'
    },
    colors: ['Platinum', 'Matte Black', 'Sage'],
    rating: 4.5,
    reviews: 342,
  },
  {
    id: '8',
    name: 'Razer Blade 15',
    brand: 'Razer',
    price: 2799,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
    specs: {
      processor: 'Intel Core i9-13950HX',
      ram: '32GB',
      storage: '1TB SSD',
      display: '15.6" QHD 240Hz',
      graphics: 'NVIDIA RTX 4080'
    },
    colors: ['Black'],
    rating: 4.7,
    reviews: 412,
  }
];

export const brands = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Dell', logo: '💻' },
  { name: 'HP', logo: '🖥️' },
  { name: 'Lenovo', logo: '💼' },
  { name: 'Asus', logo: '⚡' },
  { name: 'Microsoft', logo: '🪟' },
  { name: 'Razer', logo: '🐍' },
  { name: 'Acer', logo: '🔷' }
];
