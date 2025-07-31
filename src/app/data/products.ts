import { Product } from '../models/product.model';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    image: 'https://images.pexels.com/photos/3945681/pexels-photo-3945681.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    inStock: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness with this advanced smartwatch featuring heart rate monitoring.',
    price: 299.99,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    rating: 4.3,
    reviews: 89,
    inStock: true
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt perfect for everyday wear.',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    rating: 4.7,
    reviews: 256,
    inStock: true
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    description: '85mm f/1.8 portrait lens perfect for professional photography and stunning bokeh.',
    price: 599.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Photography',
    rating: 4.8,
    reviews: 67,
    inStock: true
  },
  {
    id: '5',
    name: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature control.',
    price: 89.99,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Home',
    rating: 4.4,
    reviews: 145,
    inStock: true
  },
  {
    id: '6',
    name: 'Premium Coffee Beans',
    description: 'Single-origin arabica coffee beans roasted to perfection for the ultimate coffee experience.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Food',
    rating: 4.6,
    reviews: 203,
    inStock: true
  },
  {
    id: '7',
    name: 'Leather Backpack',
    description: 'Handcrafted leather backpack with multiple compartments for work and travel.',
    price: 149.99,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Accessories',
    rating: 4.5,
    reviews: 78,
    inStock: false
  },
  {
    id: '8',
    name: 'Wireless Phone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4516450/pexels-photo-4516450.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    rating: 4.2,
    reviews: 167,
    inStock: true
  }
];

export const categories = ['All', 'Electronics', 'Clothing', 'Photography', 'Home', 'Food', 'Accessories'];