import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogOut, lucidePackage, lucideShoppingCart, lucideStar, lucideUser } from '@ng-icons/lucide';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { HlmCardFooter, HlmCardImports } from '@spartan-ng/helm/card';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HlmCardImports, 
    HlmCardFooter, 
    HlmButton,
    NgIcon
  ],
  providers: [provideIcons({ 
      lucidePackage, 
      lucideShoppingCart,
      lucideUser,
      lucideLogOut,
      lucideStar
     })],
  template: `
    <a [routerLink]="['/product', product.id]">
      <hlm-card class="group hover:shadow-lg transition-all duration-300 h-full" hlmCard>
        <div class="aspect-square overflow-hidden rounded-t-lg">
          <img
            [src]="product.image"
            [alt]="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <hlm-card-content class="p-4" hlmCardContent>
          <div class="flex items-center justify-between mb-2">
            <span hlmBadge variant="secondary" class="text-xs">
              {{ product.category }}
            </span>
            <span *ngIf="!product.inStock" hlmBadge variant="destructive" class="text-xs">
              Out of Stock
            </span>
          </div>
          <h3 class="font-semibold text-lg mb-2 line-clamp-2">{{ product.name }}</h3>
          <p class="text-muted-foreground text-sm mb-3 line-clamp-2">{{ product.description }}</p>
          <div class="flex items-center gap-2 mb-3">
            <div class="flex items-center">
              <!-- <lucide-icon name="star" class="h-4 w-4 fill-yellow-400 text-yellow-400"></lucide-icon> -->
              <ng-icon name="lucideStar" class="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span class="text-sm ml-1">{{ product.rating }}</span>
            </div>
            <span class="text-muted-foreground text-sm">({{ product.reviews }} reviews)</span>
          </div>
        </hlm-card-content>
        <hlm-card-footer class="p-4 pt-0 flex items-center justify-between" hlmCardFooter>
          <div class="text-2xl font-bold">\${{ product.price }}</div>
          <button
            hlmBtn
            size="sm"
            class="gap-2"
            [disabled]="!product.inStock"
            (click)="handleAddToCart($event)"
          >
            <!-- <lucide-icon name="shopping-cart" class="h-4 w-4"></lucide-icon> -->
            <ng-icon name="lucideShoppingCart" class="h-4 w-4" />
            Add to Cart
          </button>
        </hlm-card-footer>
      </hlm-card>
    </a>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  handleAddToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image
    });
    
    this.toastService.success(`${this.product.name} added to cart!`);
  }
}