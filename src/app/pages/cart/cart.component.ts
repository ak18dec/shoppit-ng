import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMinus, lucidePlus, lucideShoppingBag, lucideTrash2 } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIcon,
    HlmButton,
    HlmCardImports,
    HlmSeparator
  ],
  providers: [provideIcons({ 
    lucideMinus,
    lucidePlus,
    lucideTrash2,
    lucideShoppingBag
   })],
  template: `
    <div *ngIf="cartService.items().length > 0; else emptyCart" class="max-w-4xl mx-auto space-y-6 text-primary">
      <h1 class="text-3xl font-bold">Shopping Cart ({{ cartService.totalItems() }} items)</h1>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <hlm-card *ngFor="let item of cartService.items()" hlmCard>
            <hlm-card-content class="p-6" hlmCardContent>
              <div class="flex gap-4">
                <img
                  [src]="item.image"
                  [alt]="item.name"
                  class="w-20 h-20 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h3 class="font-semibold text-lg mb-2">{{ item.name }}</h3>
                  <div class="text-2xl font-bold text-primary mb-4">
                    \${{ item.price }}
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <button
                        hlmBtn
                        variant="outline"
                        size="sm"
                        (click)="cartService.updateQuantity(item.id, item.quantity - 1)"
                      >
                        <ng-icon name="lucideMinus" class="h-4 w-4" />
                      </button>
                      <span class="w-12 text-center font-medium">{{ item.quantity }}</span>
                      <button
                        hlmBtn
                        variant="outline"
                        size="sm"
                        (click)="cartService.updateQuantity(item.id, item.quantity + 1)"
                      >
                        <ng-icon name="lucidePlus" class="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      hlmBtn
                      variant="outline"
                      size="sm"
                      (click)="cartService.removeFromCart(item.id)"
                    >
                      <ng-icon name="lucideTrash2" class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </hlm-card-content>
          </hlm-card>
        </div>

        <div class="lg:col-span-1">
          <hlm-card class="sticky top-24" hlmCard>
            <hlm-card-content class="p-6" hlmCardContent>
              <h2 class="text-xl font-bold mb-4">Order Summary</h2>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span>Subtotal ({{ cartService.totalItems() }} items)</span>
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
              <div hlmSeparator class="my-4"></div>
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>\${{ (cartService.totalPrice() * 1.08).toFixed(2) }}</span>
              </div>
              <a routerLink="/checkout" class="block mt-6">
                <button hlmBtn size="lg" class="w-full">
                  Proceed to Checkout
                </button>
              </a>
              <a routerLink="/products" class="block mt-3">
                <button hlmBtn variant="outline" size="lg" class="w-full">
                  Continue Shopping
                </button>
              </a>
            </hlm-card-content>
          </hlm-card>
        </div>
      </div>
    </div>

    <ng-template #emptyCart>
      <div class="text-center py-12">
        <ng-icon name="lucideShoppingBag" class="h-16 w-16 mx-auto mb-4 text-muted-foreground" size="64" color="var(--muted-foreground)"/>
        <h2 class="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p class="text-muted-foreground mb-6">Add some products to get started!</p>
        <a routerLink="/products">
          <button hlmBtn>Continue Shopping</button>
        </a>
      </div>
    </ng-template>
  `
})
export class CartComponent {
  constructor(public cartService: CartService) {}
}