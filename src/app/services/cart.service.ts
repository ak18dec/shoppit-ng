import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);

  items = this.itemsSignal.asReadonly();
  totalItems = computed(() => this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0));
  totalPrice = computed(() => this.itemsSignal().reduce((sum, item) => sum + item.price * item.quantity, 0));

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.itemsSignal.set(JSON.parse(storedCart));
    }
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.itemsSignal()));
  }

  addToCart(product: Omit<CartItem, 'quantity'>) {
    const currentItems = this.itemsSignal();
    const existingItem = currentItems.find(item => item.id === product.id);
    
    if (existingItem) {
      this.itemsSignal.set(
        currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this.itemsSignal.set([...currentItems, { ...product, quantity: 1 }]);
    }
    
    this.saveCart();
  }

  removeFromCart(id: string) {
    this.itemsSignal.set(this.itemsSignal().filter(item => item.id !== id));
    this.saveCart();
  }

  updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }
    
    this.itemsSignal.set(
      this.itemsSignal().map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
    this.saveCart();
  }

  clearCart() {
    this.itemsSignal.set([]);
    this.saveCart();
  }
}