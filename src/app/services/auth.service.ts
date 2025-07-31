import { Injectable, signal } from '@angular/core';
import { User } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSignal = signal<User | null>(null);
  private loadingSignal = signal(true);

  user = this.userSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();

  constructor() {
    this.checkStoredUser();
  }

  private checkStoredUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSignal.set(JSON.parse(storedUser));
    }
    this.loadingSignal.set(false);
  }

  async login(email: string, password: string): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0]
      };
      this.userSignal.set(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  }

  async signup(email: string, password: string, name: string): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password && name) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name
      };
      this.userSignal.set(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  }

  logout() {
    this.userSignal.set(null);
    localStorage.removeItem('user');
  }

  updateProfile(name: string, email: string) {
    const currentUser = this.userSignal();
    if (currentUser) {
      const updatedUser = { ...currentUser, name, email };
      this.userSignal.set(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }
}