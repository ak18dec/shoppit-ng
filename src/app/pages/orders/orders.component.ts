import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideCreditCard, lucidePackage } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { Order } from '../../models/product.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    HlmCardImports,
    HlmBadge,
    HlmSeparator
  ],
  providers: [provideIcons({ 
    lucidePackage,
    lucideCalendar,
    lucideCreditCard
   })],
  template: `
    <div *ngIf="orders().length > 0; else noOrders" class="max-w-4xl mx-auto space-y-6">
      <h1 class="text-3xl font-bold">Order History</h1>

      <div class="space-y-6">
        <hlm-card *ngFor="let order of orders()" hlmCard>
          <hlm-card-header hlmCardHeader>
            <div class="flex items-center justify-between">
              <hlm-card-title class="flex items-center gap-2" hlmCardTitle>
                <ng-icon name="lucidePackage" class="h-5 w-5" size="24"/>
                Order #{{ order.id }}
              </hlm-card-title>
              <span hlmBadge variant="secondary" class="capitalize">
                {{ order.status }}
              </span>
            </div>
            <div class="flex items-center gap-4 text-sm text-muted-foreground">
              <div class="flex items-center gap-1">
                <ng-icon name="lucideCalendar" class="h-4 w-4" size="24"/>
                {{ formatDate(order.orderDate) }}
              </div>
              <div class="flex items-center gap-1">
                <ng-icon name="lucideCreditCard" class="h-4 w-4" size="24"/>
                Total: \${{ order.total.toFixed(2) }}
              </div>
            </div>
          </hlm-card-header>
          <hlm-card-content hlmCardContent>
            <div class="space-y-4">
              <div>
                <h4 class="font-medium mb-2">Items ({{ order.items.length }})</h4>
                <div class="space-y-2">
                  <div *ngFor="let item of order.items" class="flex items-center gap-4 p-2 bg-muted/50 rounded-lg">
                    <img
                      [src]="item.image"
                      [alt]="item.name"
                      class="w-12 h-12 object-cover rounded"
                    />
                    <div class="flex-1">
                      <div class="font-medium">{{ item.name }}</div>
                      <div class="text-sm text-muted-foreground">
                        Qty: {{ item.quantity }} × \${{ item.price }}
                      </div>
                    </div>
                    <div class="font-medium">
                      \${{ (item.price * item.quantity).toFixed(2) }}
                    </div>
                  </div>
                </div>
              </div>

              <div hlmSeparator></div>

              <div>
                <h4 class="font-medium mb-2">Shipping Address</h4>
                <div class="text-sm text-muted-foreground">
                  <div>{{ order.shippingInfo.firstName }} {{ order.shippingInfo.lastName }}</div>
                  <div>{{ order.shippingInfo.address }}</div>
                  <div>{{ order.shippingInfo.city }}, {{ order.shippingInfo.zipCode }}</div>
                  <div>{{ order.shippingInfo.country }}</div>
                </div>
              </div>
            </div>
          </hlm-card-content>
        </hlm-card>
      </div>
    </div>

    <ng-template #noOrders>
      <div class="text-center py-12">
        <ng-icon name="lucidePackage" class="h-16 w-16 mx-auto mb-4 text-muted-foreground" size="64" color="var(--muted-foreground)"/>
        <h2 class="text-2xl font-bold mb-2">No orders yet</h2>
        <p class="text-muted-foreground">Your order history will appear here once you make a purchase.</p>
      </div>
    </ng-template>
  `
})
export class OrdersComponent implements OnInit {
  orders = signal<Order[]>([]);

  ngOnInit() {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    this.orders.set(storedOrders.reverse()); // Show newest first
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}