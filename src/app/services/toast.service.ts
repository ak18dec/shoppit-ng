import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Array<{id: string, message: string, type: 'success' | 'error' | 'info'}> = [];

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  private show(message: string, type: 'success' | 'error' | 'info') {
    const id = Math.random().toString(36).substr(2, 9);
    const toast = { id, message, type };
    this.toasts.push(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
      this.remove(id);
    }, 3000);

    // Simple console log for now - in a real app you'd use a proper toast component
    console.log(`${type.toUpperCase()}: ${message}`);
  }

  private remove(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }
}