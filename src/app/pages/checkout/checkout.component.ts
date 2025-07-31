import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCreditCard, lucideMapPin } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HlmButton,
    HlmCardImports,
    HlmInput,
    HlmLabel,
    HlmSeparator
  ],
  providers: [provideIcons({ 
    lucideMapPin,
    lucideCreditCard
   })],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      <h1 class="text-3xl font-bold">Checkout</h1>

      <form (ngSubmit)="handleSubmit()" class="grid lg:grid-cols-2 gap-8">
        <div class="space-y-6">
          <!-- Shipping Information -->
          <hlm-card hlmCard>
            <hlm-card-header hlmCardHeader>
              <hlm-card-title class="flex items-center gap-2" hlmCardTitle>
                <ng-icon name="lucideMapPin" class="h-5 w-5" />
                Shipping Information
              </hlm-card-title>
            </hlm-card-header>
            <hlm-card-content class="space-y-4" hlmCardContent>
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-2">
                  <label hlmLabel for="firstName">First Name</label>
                  <input hlmInput id="firstName" [(ngModel)]="shippingInfo.firstName" name="firstName" required />
                </div>
                <div class="grid gap-2">
                  <label hlmLabel for="lastName">Last Name</label>
                  <input hlmInput id="lastName" [(ngModel)]="shippingInfo.lastName" name="lastName" required />
                </div>
              </div>
              <div class="grid gap-2">
                <label hlmLabel for="email">Email</label>
                <input hlmInput id="email" type="email" [(ngModel)]="shippingInfo.email" name="email" required />
              </div>
              <div class="grid gap-2">
                <label hlmLabel for="address">Address</label>
                <input hlmInput id="address" [(ngModel)]="shippingInfo.address" name="address" required />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-2">
                  <label hlmLabel for="city">City</label>
                  <input hlmInput id="city" [(ngModel)]="shippingInfo.city" name="city" required />
                </div>
                <div class="grid gap-2">
                  <label hlmLabel for="zipCode">ZIP Code</label>
                  <input hlmInput id="zipCode" [(ngModel)]="shippingInfo.zipCode" name="zipCode" required />
                </div>
              </div>
            </hlm-card-content>
          </hlm-card>

          <!-- Payment Information -->
          <hlm-card hlmCard>
            <hlm-card-header hlmCardHeader>
              <hlm-card-title class="flex items-center gap-2" hlmCardTitle>
                <ng-icon name="lucideCreditCard" class="h-5 w-5" />
                Payment Information
              </hlm-card-title>
            </hlm-card-header>
            <hlm-card-content class="space-y-4" hlmCardContent>
              <div class="grid gap-2">
                <label hlmLabel for="nameOnCard">Name on Card</label>
                <input hlmInput id="nameOnCard" [(ngModel)]="paymentInfo.nameOnCard" name="nameOnCard" required />
              </div>
              <div class="grid gap-2">
                <label hlmLabel for="cardNumber">Card Number</label>
                <input hlmInput id="cardNumber" placeholder="1234 5678 9012 3456" [(ngModel)]="paymentInfo.cardNumber" name="cardNumber" required />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-2">
                  <label hlmLabel for="expiryDate">Expiry Date</label>
                  <input hlmInput id="expiryDate" placeholder="MM/YY" [(ngModel)]="paymentInfo.expiryDate" name="expiryDate" required />
                </div>
                <div class="grid gap-2">
                  <label hlmLabel for="cvv">CVV</label>
                  <input hlmInput id="cvv" placeholder="123" [(ngModel)]="paymentInfo.cvv" name="cvv" required />
                </div>
              </div>
            </hlm-card-content>
          </hlm-card>
        </div>

        <!-- Order Summary -->
        <div>
          <hlm-card class="sticky top-24" hlmCard>
            <hlm-card-header hlmCardHeader>
              <hlm-card-title hlmCardTitle>Order Summary</hlm-card-title>
            </hlm-card-header>
            <hlm-card-content class="space-y-4" hlmCardContent>
              <div *ngFor="let item of cartService.items()" class="flex justify-between">
                <div>
                  <div class="font-medium">{{ item.name }}</div>
                  <div class="text-sm text-muted-foreground">Qty: {{ item.quantity }}</div>
                </div>
                <div>\${{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
              <div hlmSeparator></div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span>\${{ cartService.totalPrice().toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Shipping</span>
                  <span class="text-green-600">Free</span>
                </div>
                <div class="flex justify-between">
                  <span>Tax</span>
                  <span>\${{ (cartService.totalPrice() * 0.08).toFixed(2) }}</span>
                </div>
              </div>
              <div hlmSeparator></div>
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>\${{ (cartService.totalPrice() * 1.08).toFixed(2) }}</span>
              </div>
              <button
                hlmBtn
                type="submit"
                size="lg"
                class="w-full"
                [disabled]="loading()"
              >
                {{ loading() ? 'Processing...' : 'Place Order' }}
              </button>
            </hlm-card-content>
          </hlm-card>
        </div>
      </form>
    </div>
  `
})
export class CheckoutComponent implements OnInit{
  loading = signal(false);

  shippingInfo = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States'
  };

  paymentInfo = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  };

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    if (this.cartService.items().length === 0) {
      this.router.navigate(['/cart']);
    }
  }
  ngOnInit(): void {
    this.shippingInfo = {
    firstName: this.authService.user()?.name || '',
    lastName: '',
    email: this.authService.user()?.email || '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States'
  };
  }

  async handleSubmit() {
    this.loading.set(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      items: this.cartService.items(),
      total: this.cartService.totalPrice() * 1.08,
      shippingInfo: this.shippingInfo,
      orderDate: new Date().toISOString(),
      status: 'confirmed'
    };

    // Store order in localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    this.cartService.clearCart();
    this.loading.set(false);
    this.toastService.success('Order placed successfully!');
    this.router.navigate(['/orders']);
  }
}