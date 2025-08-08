import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideShield, lucideShoppingCart, lucideStar, lucideTruck } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { Product } from '../../models/product.model';
import { products } from '../../data/products';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    HlmButton,
    HlmBadge,
    HlmCardImports,
    HlmSeparator
  ],
  providers: [provideIcons({ 
    lucideStar,
    lucideShoppingCart,
    lucideTruck,
    lucideShield
   })],
  template: `
    <div *ngIf="product" class="grid lg:grid-cols-2 gap-12 text-primary">
      <div class="space-y-4">
        <div class="aspect-square overflow-hidden rounded-lg">
          <img
            [src]="product.image"
            [alt]="product.name"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <span hlmBadge variant="secondary" class="mb-2">
            {{ product.category }}
          </span>
          <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
          <div class="flex items-center gap-4 mb-4">
            <div class="flex items-center gap-1">
              <ng-icon name="lucideStar" class="h-5 w-5 fill-yellow-400 text-yellow-400" size="16" />
              <span class="font-medium">{{ product.rating }}</span>
            </div>
            <span class="text-muted-foreground">({{ product.reviews }} reviews)</span>
            <span *ngIf="product.inStock; else outOfStock" hlmBadge variant="outline" class="text-green-600">
              In Stock
            </span>
            <ng-template #outOfStock>
              <span hlmBadge variant="destructive">
                Out of Stock
              </span>
            </ng-template>
          </div>
          <div class="text-3xl font-bold text-primary mb-4">
            \${{ product.price }}
          </div>
        </div>

        <div hlmSeparator></div>

        <div>
          <h2 class="text-xl font-semibold mb-3">Description</h2>
          <p class="text-muted-foreground leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <div class="space-y-4">
          <button
            hlmBtn
            size="lg"
            class="w-full gap-2"
            [disabled]="!product.inStock"
            (click)="handleAddToCart()"
          >
            <ng-icon name="lucideShoppingCart" class="h-5 w-5" size="20" />
            {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <hlm-card hlmCard>
            <hlm-card-content class="pt-4" hlmCardContent>
              <div class="flex items-center gap-3">
                <ng-icon name="lucideTruck" class="h-5 w-5 text-primary" size="18" />
                <div>
                  <div class="font-medium">Free Shipping</div>
                  <div class="text-sm text-muted-foreground">On orders over $50</div>
                </div>
              </div>
            </hlm-card-content>
          </hlm-card>
          <hlm-card hlmCard>
            <hlm-card-content class="pt-4" hlmCardContent>
              <div class="flex items-center gap-3">
                <ng-icon name="lucideShield" class="h-5 w-5 text-primary" size="18" />
                <div>
                  <div class="font-medium">Warranty</div>
                  <div class="text-sm text-muted-foreground">30-day guarantee</div>
                </div>
              </div>
            </hlm-card-content>
          </hlm-card>
        </div>
      </div>
    </div>
  `
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = products.find(p => p.id === id);
    
    if (!this.product) {
      this.router.navigate(['/products']);
    }
  }

  handleAddToCart() {
    if (this.product) {
      this.cartService.addToCart({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        image: this.product.image
      });
      this.toastService.success(`${this.product.name} added to cart!`);
    }
  }
}