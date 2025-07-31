import { Injectable, signal, effect } from '@angular/core';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';
export interface AppToast {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toasts = signal<AppToast[]>([]);

  readonly toastSignal = this.toasts;

  success(message: string) {
    this.push({
      title: 'Dummy Success Titlle',
      description: message,
      variant: 'success'
    })
  }

  error(message: string) {
    this.push({
      title: 'Dummy Error Titlle',
      description: message,
      variant: 'error'
    })
  }

  info(message: string) {
    this.push({
      title: 'Dummy Info Titlle',
      description: message,
      variant: 'info'
    })
  }

  push(toast: AppToast) {
    this.toasts.set([...this.toasts(), toast]);
  }

  clear() {
    this.toasts.set([]);
  }
}